const pool = require('../db');
const axios = require('axios');
require('dotenv').config();

async function runSensorWorker() {
  try {
    console.log("Worker started");
  
    // Find all bintypes 
    const binTypes = await pool.query('SELECT * FROM bin_types');
    console.log(binTypes.rows[0].bin_type_id);

    // Find all sensors attached to a bin
    const sensors = await pool.query('SELECT * FROM bins, sensors WHERE bins.bin_id = sensors.bin_id');
    console.log(sensors.rows[0]);

    // Update sensor info
    for (const sensor of sensors.rows) {
      console.log('try');

      // Request the data from endpoint
      const sensorResponse = await axios.get(`https://portal.io-things.eu/api/key/uplink/${sensor.sensor_credential}?size=1&start=1700553133&key=${process.env.BINTHING_KEY}`);
      console.log(sensorResponse.data.items[0].time.seconds);

      // Get bintype of the bin of current sensor
      const bintype = await pool.query('SELECT * FROM bin_types WHERE bin_type_id = (SELECT bin_type_id FROM bins WHERE bin_id = $1)', [sensor.bin_id]);
      const batteryLevel = 100;
      const fillLevel = Math.round(((bintype.rows[0].bin_type_height - sensorResponse.data.items[0].parsedPayload.distance)/(bintype.rows[0].bin_type_height)) * 100);
      const full = fillLevel > 75 ? 'full' : fillLevel < 50 ? 'empty' : 'medium' ;
      const temperature = sensorResponse.data.items[0].parsedPayload.temperature;
      const time = sensorResponse.data.items[0].time.seconds;
      
      // Update sensor info 
      const updateSensorInfo = await pool.query('UPDATE sensors SET sensor_battery_level = $1, sensor_fill_level = $2, sensor_temperature = $3, sensor_full = $4, sensor_last_seen = to_timestamp($5) WHERE sensor_id = $6', [batteryLevel, fillLevel < 0 ? 0 : fillLevel, temperature, full, time, sensor.sensor_id]);
      console.log(updateSensorInfo);
      
    }

      
  } catch (err) {
    console.log(err);
  }
}

module.exports = runSensorWorker;


