const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createServiceLog,
  getAllServices,
  updateServiceLog,
  deleteServiceLog,
  getAllServiceTypes,
} = require("../controllers/services");

router.put("/create", auth, createServiceLog);
router.post("/allservices", auth, getAllServices);
router.patch("/update/", auth, updateServiceLog);
router.delete("/delete/", auth, deleteServiceLog);
router.get("/types", getAllServiceTypes);

module.exports = router;
