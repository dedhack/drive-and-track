require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //
  console.log(req.headers);
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).send({
        status: "error",
        message: "unauthorized",
      });
    }
  } else {
    return res.status(403).json({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = auth;
