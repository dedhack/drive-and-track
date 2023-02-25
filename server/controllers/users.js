const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

// Create a user
const createUser = async (req, res) => {
  try {
    // try to check if user already exists
    // FIXME: see if there is a better way
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

// Login user
const loginUser = async (req, res) => {
  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (user.rows.length === 0) {
      res
        .status(400)
        .json({ status: "error", message: "username/password issue" });
    }

    // check what is returned in user
    // res.json(user);

    // Check if password is correct
    const result = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );
    if (!result) {
      return res
        .status(401)
        .json({ status: "error", message: "username/password issue" });
    }

    // creating payload
    const payload = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      is_Admin: user.rows[0].is_admin,
    };

    // create access token
    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: payload.id,
    });

    // create refresh token
    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: payload.id, // only express requires you to create the id.
    });

    const response = { access, refresh };
    // const response = typeof payload.id;
    res.json(response);
  } catch (error) {
    console.log("POST /users/login", error);
    res.status(400).json({ status: "error", message: error });
  }
};

//  Refresh token
const refreshToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      email: decoded.email,
      is_Admin: decoded.is_Admin,
    };

    // create access token
    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: payload.id,
    });
    const response = { access }; // don't have to do for refresh, once refresh is created and will be valid for 30 days
  } catch (error) {
    console.log("POST /users/refresh", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// TODO: Logout user

const logoutUser = async (req, res) => {
  try {
  } catch (error) {}
};

//  Update password
const updatePassword = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);

    const user = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING username",
      [password, req.body.id]
    );
    res.json({ status: "success", message: "user password has been updated" });
  } catch (error) {
    console.log("PATCH /users/update", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

//  Delete User
// TODO: need to throw a response if user not authenticated
const deleteUser = async (req, res) => {
  try {
    const user = await pool.query("DELETE FROM users WHERE id = $1", [
      req.body.id,
    ]);
    res.json({ status: "success", message: "user has been deleted" });
  } catch (error) {
    console.log("DELETE /users/:id", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// get all users

const getAllUsers = async (req, res) => {
  try {
    // check if user is admin
    const decoded = jwt.verify(req.body.access, process.env.ACCESS_SECRET);
    console.log(decoded.is_Admin);
    if (!decoded.is_Admin) {
      return res.json({ status: "error", message: "not authorized" });
    }

    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.log("GET /users/allusers", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  refreshToken,
};
