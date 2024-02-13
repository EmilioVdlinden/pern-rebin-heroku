const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const authorization = require('../middleware/authorization');
const isEmail = require('../utils/isMail');

// Register
router.post('/register', async (req, res) => {
  try {

    //1. Destructure req.body (name, email, password) that was given using the payloads
    
    const {name, email, password} = req.body;

    //2. Email validation

    if(!isEmail(email)) {
      console.log(isEmail(email));
      return res.status(400).send('Invalid email');
    }

    
    //3. Check if user exists (if user exists throw error)

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email
    ]);

    if(user.rows.length !== 0) {
      return res.status(409).json('User already exist');
    }

    //4. Bcrypt the user password

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);

    //5. Enter the new user inside our database

    const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, hash]);

    //6. Generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({token});

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Login
router.post('/login', async (req, res) => {
  try {

  //1. Destructure req.body (email, password) that was given using the payloads

  const {email, password} = req.body;

  //2. Check if user exists (if user exists throw error)

  const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

  if(user.rows.length === 0) {
    return res.status(401).json('Invalid email or password');
  }

   //3. Check if incoming password is same as database password 

   const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
   if(!validPassword) {
    return res.status(401).send('Invalid email or password'); 
   }

   //4. Generate jwt token

   const token = jwtGenerator(user.rows[0].user_id);
   res.json({token});
   
  } catch(err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get('/verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
})



module.exports = router;