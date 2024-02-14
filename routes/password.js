const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');
const nodemailer = require("nodemailer");
const {PASSWORD_RESET_HTML_EN, PASSWORD_RESET_TEXT_EN} = require('../email-templates/passwordReset');
require('dotenv').config();

//Forgot password
router.post("/forgot", async (req, res) => {
  try {

    const {email} = req.body;
  
    //1. Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
    if(user.rows.length === 0 || !user) {
      return res.status(401).json('User does not exist!');
    }

    //2. Generating our JWT token
    const token = jwtGenerator(user.rows[0].user_id);
    
    //3. Generate link that user receives in mail
    const link = `/password/reset/${user.rows[0].user_id}/${token}`;
    console.log(link);

    //4. Send an email using nodemailer with the link
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS,
      to: email,
      subject: 'Rebin password reset',
      html: PASSWORD_RESET_HTML_EN(link),
      text:  PASSWORD_RESET_TEXT_EN(link)
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({info});
    

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


//Update password
router.post("/reset/:user_id/:token", async (req, res) => {
  try {

    //1. Destructure the params
    const {user_id, token} = req.params;
    const {password} = req.body;

    //2. Check if token exists
    if(!token) {
      return res.status(403).json('Not Authorized');
    }

    //3. Check validity token & it will return decoded token
    const payload = await jwt.verify(token, process.env.jwtSecret);

    //4. Bycrypt the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);

    //5. Update new password

    const update = await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hash, user_id]);
    res.json({"update": true});

  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Something went wrong");
  }  
});



module.exports = router;

