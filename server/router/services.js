const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createServiceLog,
  getAllServices,
  updateServiceLog,
  deleteServiceLog,
} = require("../controllers/services");

router.put("/create", auth, createServiceLog);
router.post("/all", auth, getAllServices);
router.patch("/update/", auth, updateServiceLog);
router.delete("/delete/", auth, deleteServiceLog);

module.exports = router;
