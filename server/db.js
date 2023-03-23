//////////////////// UNHIDE HERE TO RUN DB LOCALLY
const Pool = require("pg").Pool;
// require("dotenv").config(); // TODO: not necessary

// original
// const pool = new Pool({
//   user: process.env.USER, // to .env?
//   password: process.env.DB_PASS, // to .env?
//   host: "localhost",
//   port: 5432, // to .env?
//   database: "proj4", // to modify
// });
////////////////////

const pg = require("pg");

const conString = process.env.ELEPHANT_SQL;
const pool = new Pool({
  user: process.env.ELE_USER, // to .env?
  password: process.env.ELE_PASS, // to .env?
  host: conString,
  port: 5432, // to .env?
  database: process.env.ELE_USER, // to modify
});

module.exports = pool;
