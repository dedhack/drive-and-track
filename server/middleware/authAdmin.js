require("dotenv").config();

const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  //
  console.log(req.headers);
  const token = req.headers["authorization"].replace("Bearer ", "");
  // console.log("token: ", token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      // console.log("decoded: ", decoded);
      req.decoded = decoded;
      if (decoded.is_admin === "false") {
        return res.status(405).send({
          status: "error",
          message: "not admin",
        });
      } else {
        console.log("Admin coming through");
        next();
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(402).send({
          status: "error",
          message: "token expired",
        });
      }
      // general catch all
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

module.exports = authAdmin;
