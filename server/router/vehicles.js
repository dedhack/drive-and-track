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
} = require("../controllers/vehicles");

// FIXME: all routes need to include auth. temporarily removed for testing

router.put("/create", createVehicle);
router.post("/allvehicles", getAllVehicles);
router.post("/vehiclebyid", getVehicleById); //info for particular vehicle
router.patch("/update/", updateVehicle);
router.delete("/delete/", deleteVehicle);

module.exports = router;
