const pool = require("../db");

// Create Vehicle and Vehicle Logs
// We create a vehicle and vehicle logs in one transaction
// We use the id of the vehicle we just created to insert into vehicle_logs
// Don't check if vehicle already exists
const createVehicle = async (req, res) => {
  try {
    const {
      veh_name,
      capacity,
      user_id,
      veh_desc,
      make,
      model,
      year,
      vin,
      ins_pol,
    } = req.body;

    const newVehicle = await pool.query(
      "INSERT INTO vehicles (veh_name, capacity, user_id) VALUES ($1, $2, $3) RETURNING *",
      [veh_name, capacity, user_id]
    );

    // res.json(newVehicle.rows[0]); // FIXME: remove this line, for testing only

    const newVehicleLogs = await pool.query(
      "INSERT INTO vehicle_logs (veh_id, veh_desc, make, model, year, vin, ins_pol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [newVehicle.rows[0].veh_id, veh_desc, make, model, year, vin, ins_pol]
    );

    // res.json(newVehicle.rows[0]); // FIXME: remove this line, for testing only
    res.json({ status: "success", message: "vehicle has been added" });
  } catch (error) {
    console.log("PUT /vehicles/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {};

// Get vehicle by id
const getVehicleById = async (req, res) => {};

// Update vehicle
const updateVehicle = async (req, res) => {};

// Delete vehicle
const deleteVehicle = async (req, res) => {};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
