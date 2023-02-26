const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createServiceLog,
  getAllServices,
  updateServiceLog,
  deleteServiceLog,
} = require("../controllers/services");

router.put("/create", createServiceLog);
router.get("/all", getAllServices);
router.patch("/update/", updateServiceLog);
router.delete("/delete/", deleteServiceLog);

module.exports = router;
