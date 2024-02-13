const {Pool} = require("pg");
require('dotenv').config();


const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
}

const proConfig = {
  connectionString: process.env.DATABASE_URL, // Heroku addons
  ssl: {
    rejectUnauthorized: false, 
  }
}


// Configuration for the PostgreSQL pool
const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

module.exports = pool;