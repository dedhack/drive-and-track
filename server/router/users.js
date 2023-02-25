const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  updatePassword,
  deleteUser,
} = require("../controllers/users");

router.put("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // require auth
router.patch("/update", updatePassword); // require auth
router.delete("/delete", deleteUser); // require auth

module.exports = router;
