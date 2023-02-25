const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createUser,
  loginUser,
  logoutUser,
  updatePassword,
  deleteUser,
  getAllUsers,
} = require("../controllers/users");

router.put("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // require auth
router.patch("/update", auth, updatePassword); // require auth
router.delete("/delete", auth, deleteUser); // require auth
router.get("/allusers", auth, getAllUsers);

module.exports = router;
