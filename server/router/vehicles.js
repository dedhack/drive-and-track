const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
// import controller functions
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehicleDistance,
} = require("../controllers/vehicles");

// FIXME: all routes need to include auth. temporarily removed for testing

router.put("/create", auth, createVehicle);
router.post("/allvehicles", auth, getAllVehicles);
router.post("/vehiclebyid", auth, getVehicleById); //info for particular vehicle
router.patch("/update/", auth, updateVehicle);
router.delete("/delete/", auth, deleteVehicle);
router.get("/distance", getVehicleDistance);

module.exports = router;
