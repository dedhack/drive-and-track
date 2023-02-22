const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

// Create a user
const createUser = async (req, res) => {
  try {
    // try to check if user already exists
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );
    if (checkUser.rows.length > 0) {
      res.status(400).json({ status: "error", message: "User already exists" });
      return;
    }
    const password = await bcrypt.hash(req.body.password, 12);
    const user = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [req.body.username, password, req.body.email]
    );
    res.json({ status: "success", message: "user has been added" });
  } catch (error) {
    console.log("PUT /users/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { createUser };
