const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/sensors/:customer_id', async (req, res) => {
  try {

    const sensors = await pool.query('SELECT COUNT(*) FROM bins, sensors WHERE bins.customer_id = $1 AND bins.bin_id = sensors.bin_id', [req.params.customer_id]);
    res.json({'sensors': sensors.rows[0]});
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
})

router.get('/sensors/:customer_id/full', async (req, res) => {
  try {
    const sensors = await pool.query('SELECT COUNT(*) FROM bins, sensors WHERE bins.customer_id = $1 AND bins.bin_id = sensors.bin_id AND sensors.sensor_full = $2', [req.params.customer_id, 'full']);
    res.json({'full': sensors.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
})

router.get('/sensors/:customer_id/distribution', async (req, res) => {
try {

  const full = await pool.query('SELECT count(*) as full FROM bins, sensors WHERE bins.customer_id = $1 AND bins.bin_id = sensors.bin_id AND sensors.sensor_full = $2', [req.params.customer_id, 'full']);
  const medium = await pool.query('SELECT count(*) as medium FROM bins, sensors WHERE bins.customer_id = $1 AND bins.bin_id = sensors.bin_id AND sensors.sensor_full = $2', [req.params.customer_id, 'medium']);
  const empty = await pool.query('SELECT count(*) as empty FROM bins, sensors WHERE bins.customer_id = $1 AND bins.bin_id = sensors.bin_id AND sensors.sensor_full = $2', [req.params.customer_id, 'empty']);
  res.json([empty.rows[0].empty, medium.rows[0].medium, full.rows[0].full]);
  
} catch (err) {
  console.log(err);
}
})


router.get('/table/:customer_id', async (req, res) => {
  try {
    const timeFormat = 'HH12:MI PM';
    const sensors = await pool.query('SELECT bins.bin_adress as location, to_char(sensors.sensor_last_seen, $1) as time , sensors.sensor_fill_level as distance, sensors.sensor_temperature as temp FROM bins, sensors WHERE bins.customer_id = $2 AND bins.bin_id = sensors.bin_id', [timeFormat, req.params.customer_id]);
    res.json(sensors.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
})

module.exports = router;