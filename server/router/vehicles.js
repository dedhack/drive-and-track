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
router.get("/allvehicles", getAllVehicles);
router.get("/vehiclebyid", getVehicleById); //info for particular vehicle
router.patch("/update/:id", updateVehicle);
router.delete("/delete/:id", deleteVehicle);

module.exports = router;
