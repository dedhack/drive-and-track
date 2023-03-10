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

    if (newVehicleLogs.rows.length === 0) {
      console.log("PUT /vehicles/create no vehicles found");
      return res
        .status(404)
        .json({ status: "error", message: "Failed to create new vehicle" });
    }

    // res.json(newVehicle.rows[0]); // FIXME: remove this line, for testing only
    res
      .status(200)
      .json({ status: "success", message: "vehicle has been added" });
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
      return res
        .status(200)
        .json({ status: "success", message: "no vehicles found" });
    }

    res.status(200).json(allVehicles.rows);
  } catch (error) {
    console.log("GET /vehicles/allvehicles", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    // TODO: include verification that user is the owner of vehicle and authorized to get vehicle

    const veh_id = req.body.veh_id;
    const vehicle = await pool.query(
      "SELECT * FROM vehicles INNER JOIN vehicle_logs ON vehicles.veh_id = vehicle_logs.veh_id WHERE vehicles.veh_id = $1",
      [veh_id]
    );
    res.status(200).json(vehicle.rows);
  } catch (error) {
    console.log("GET /vehicles/vehicle", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Update vehicle
// There are 2 tables that will need to be updated
// TODO: Front end needs to ensure that all fields are filled out,
// reusing the same data if no changes made for that field
const updateVehicle = async (req, res) => {
  try {
    const {
      veh_id,
      veh_name,
      capacity,
      veh_desc,
      make,
      model,
      year,
      vin,
      ins_pol,
    } = req.body;

    // TODO: include verification that user is the owner of vehicle and authorized to update

    // Update vehicles table
    const updateVehicle = await pool.query(
      "UPDATE vehicles SET veh_name = $1, capacity = $2 WHERE veh_id = $3 RETURNING *",
      [veh_name, capacity, veh_id]
    );

    if (updateVehicle.rows.length === 0) {
      console.log("PATCH /vehicles/update no vehicles found");
      return res
        .status(404)
        .json({ status: "error", message: "no matching vehicle found pt1" });
    }

    // Update vehicle_logs table
    const updateVehicleLogs = await pool.query(
      "UPDATE vehicle_logs SET veh_desc = $1, make = $2, model = $3, year = $4, vin = $5, ins_pol = $6 WHERE veh_id = $7 RETURNING *",
      [veh_desc, make, model, year, vin, ins_pol, veh_id]
    );

    if (updateVehicleLogs.rows.length === 0) {
      console.log("PATCH /vehicles/update no vehicles found");
      return res
        .status(404)
        .json({ status: "error", message: "no matching vehicle found pt2" });
    }

    res
      .status(200)
      .json({ status: "success", message: "vehicle has been updated" });
  } catch (error) {
    console.log("PATCH /vehicles/update", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    // TODO: include verification that user is the owner of vehicle and authorized to update

    const { veh_id } = req.body;

    const deleteVehicleLog = await pool.query(
      "DELETE FROM vehicles WHERE veh_id = $1 RETURNING *",
      [veh_id]
    );

    if (deleteVehicleLog.rows.length === 0) {
      console.log("DELETE /vehicles/delete no vehicles found");
      return res
        .status(404)
        .json({ status: "error", message: "no matching vehicle found" });
    }

    res.status(200).json({ status: "success", message: deleteVehicleLog });
  } catch (error) {
    console.log("DELETE /vehicles/delete", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// check total distance travelled for a vehicle
const getVehicleDistance = async (req, res) => {
  try {
    const { veh_id } = req.body;

    // get the latest odometer reading for the vehicle
    const latestOdometerRefuel = await pool.query(
      "SELECT * FROM refuel_logs WHERE veh_id = $1 ORDER BY odometer DESC LIMIT 1",
      [veh_id]
    );

    const latestOdometerService = await pool.query(
      "SELECT * FROM service_logs WHERE veh_id = $1 ORDER BY odometer DESC LIMIT 1",
      [veh_id]
    );

    // compare the two latest odometer readings and return the larger one
    const latestOdometer =
      latestOdometerRefuel.rows[0].odometer >
      latestOdometerService.rows[0].odometer
        ? latestOdometerRefuel
        : latestOdometerService;

    // do for the earliest odometer reading
    const earliestOdometerRefuel = await pool.query(
      "SELECT * FROM refuel_logs WHERE veh_id = $1 ORDER BY odometer ASC LIMIT 1",
      [veh_id]
    );

    const earliestOdometerService = await pool.query(
      "SELECT * FROM service_logs WHERE veh_id = $1 ORDER BY odometer ASC LIMIT 1",
      [veh_id]
    );

    // compare the two earliest odometer readings and return the smaller one
    const earliestOdometer =
      earliestOdometerRefuel.rows[0].odometer <
      earliestOdometerService.rows[0].odometer
        ? earliestOdometerRefuel
        : earliestOdometerService;

    // subtract the two odometer readings to get the total distance travelled
    const totalDistance =
      latestOdometer.rows[0].odometer - earliestOdometer.rows[0].odometer;

    res.status(200).json(totalDistance);
  } catch (error) {
    console.log("GET /vehicles/vehicle/distance", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehicleDistance,
};
