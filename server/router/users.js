const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/users");

router.put("/create", createUser);
router.post("/login", loginUser);

module.exports = router;
