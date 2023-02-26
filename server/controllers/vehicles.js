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
const getAllVehicles = async (req, res) => {
  try {
    // select vehicles belonging to user based on user_id
    const { user_id } = req.body;

    const allVehicles = await pool.query(
      "SELECT * FROM vehicles INNER JOIN vehicle_logs ON vehicles.veh_id = vehicle_logs.veh_id WHERE vehicles.user_id = $1",
      [user_id]
    );
    // return an empty response if no vehicles found i.e. user hasn't created any vehicles
    if (allVehicles.rows.length === 0) {
      console.log("GET /vehicles/allvehicles no vehicles found");
      return res.json({ status: "success", message: "no vehicles found" });
    }

    res.json(allVehicles.rows);
  } catch (error) {
    console.log("GET /vehicles/allvehicles", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    const veh_id = req.body.veh_id;
    const vehicle = await pool.query(
      "SELECT * FROM vehicles INNER JOIN vehicle_logs ON vehicles.veh_id = vehicle_logs.veh_id WHERE vehicles.veh_id = $1",
      [veh_id]
    );
    res.json(vehicle.rows);
  } catch (error) {
    console.log("GET /vehicles/vehicle", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

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
