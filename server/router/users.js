const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/users");

router.put("/create", createUser);

module.exports = router;
