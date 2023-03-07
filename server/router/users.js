const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const {
  createUser,
  loginUser,
  logoutUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  refreshToken,
} = require("../controllers/users");

router.put("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // require auth
router.patch("/update", auth, updatePassword); // require auth
router.delete("/delete", auth, deleteUser); // require auth
router.post("/refresh", refreshToken);

// admin endpoints
router.get("/allusers", authAdmin, getAllUsers);

module.exports = router;
