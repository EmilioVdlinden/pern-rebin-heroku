const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const runSensorWorker = require('./worker/sensorWorker');

//Middleware
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//Routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.use("/statistics", require("./routes/statistics"));

app.use("/password", require("./routes/password"));

 //Listen server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port 5000!");
});

setInterval(() => {
  runSensorWorker();
}, process.env.SLEEP_INTERVAL);



runSensorWorker();