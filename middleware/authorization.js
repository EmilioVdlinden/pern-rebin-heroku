const jwt = require('jsonwebtoken');
const pool = require('../db');

module.exports = async (req, res, next) => {
  try {
    
    const jwtToken = req.header('token');

    if(!jwtToken) {
      return res.status(403).json('Not Authorized');
    }
    //It will return the decoded payload of the jwtToken 
    const payload = await jwt.verify(jwtToken, process.env.jwtSecret);
    //send the customer 
    const customer = await pool.query('SELECT customer_id FROM users WHERE user_id = $1', [payload.user]);
    req.customer = customer.rows[0].customer_id;

  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  } 
  
  next();
}