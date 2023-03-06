const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// import controller functions
const {
  createRefuelLog,
  getAllRefuels,
  updateRefuelLog,
  deleteRefuelLog,
} = require("../controllers/refuels");

router.put("/create", auth, createRefuelLog);
router.post("/allrefuels", auth, getAllRefuels); // need to be able to filter by time period
router.patch("/update/", updateRefuelLog);
router.delete("/delete/", auth, deleteRefuelLog);

module.exports = router;
