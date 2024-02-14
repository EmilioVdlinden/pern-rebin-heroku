const express = require('express');
const router = express.Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  try {

    res.json({'customer_id': req.customer});
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
})

module.exports = router;