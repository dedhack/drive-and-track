const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER, // to .env?
  password: process.env.DB_PASS, // to .env?
  host: "localhost",
  port: 5432, // to .env?
  database: "proj4", // to modify
});

module.exports = pool;
