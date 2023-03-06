const pool = require("../db");

// using 2 different tables here: service_logs and service_type
// TODO: Pending to include image file upload

// 1. create service log

const createServiceLog = async (req, res) => {
  try {
    const {
      veh_id,
      datetime,
      odometer,
      price,
      location,
      service_type,
      service_desc,
    } = req.body;

    const newServiceLog = await pool.query(
      "INSERT INTO service_logs (veh_id, datetime, odometer, price, location, service_type, service_desc) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [veh_id, datetime, odometer, price, location, service_type, service_desc]
    );

    res.status(200).json(newServiceLog.rows[0]);
  } catch (error) {
    console.log("PUT /services/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 2. get all services for particular vehicle

const getAllServices = async (req, res) => {
  try {
    // based on veh_id get all service logs for that vehicle
    // TODO: consider adding a limit to the number of service logs returned?

    const { veh_id } = req.body;

    // check if vehicle exists
    const vehicle = await pool.query(
      "SELECT * FROM vehicles WHERE veh_id = $1",
      [veh_id]
    );

    if (vehicle.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "vehicle does not exist" });
    }

    const serviceLogs = await pool.query(
      "SELECT * FROM service_logs INNER JOIN vehicles ON service_logs.veh_id = vehicles.veh_id  WHERE vehicles.veh_id = $1 ORDER BY datetime DESC",
      [veh_id]
    );
    res.status(200).json(serviceLogs.rows);
  } catch (error) {
    console.log("GET /services/all", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 3. update service log

const updateServiceLog = async (req, res) => {
  try {
    // destructure incoming data
    const {
      service_id,
      veh_id,
      datetime,
      odometer,
      price,
      location,
      service_type,
      service_desc,
    } = req.body;

    // check if valid veh_id
    const vehicle = await pool.query(
      "SELECT * FROM vehicles WHERE veh_id = $1",
      [veh_id]
    );
    if (vehicle.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "vehicle does not exist" });
    }

    // check if valid service_id
    const serviceLog = await pool.query(
      "SELECT * FROM service_logs WHERE service_id = $1",
      [service_id]
    );
    if (serviceLog.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "service log does not exist" });
    }

    const updatedServiceLog = await pool.query(
      "UPDATE service_logs SET veh_id = $1, datetime = $2, odometer = $3, price = $4, location = $5, service_type = $6, service_desc = $7 WHERE service_id = $8 RETURNING *",
      [
        veh_id,
        datetime,
        odometer,
        price,
        location,
        service_type,
        service_desc,
        service_id,
      ]
    );
    res.status(200).json(updatedServiceLog.rows[0]);
  } catch (error) {
    console.log("PATCH /services/update", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 4. delete service log

const deleteServiceLog = async (req, res) => {
  try {
    const { service_id } = req.body;

    // check if valid service_id
    const serviceLog = await pool.query(
      "SELECT * FROM service_logs WHERE service_id = $1",
      [service_id]
    );
    if (serviceLog.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "service log does not exist" });
    }

    const deletedServiceLog = await pool.query(
      "DELETE FROM service_logs WHERE service_id = $1 RETURNING *",
      [service_id]
    );
    res.status(200).json(deletedServiceLog.rows[0]);
  } catch (error) {
    console.log("DELETE /services/delete", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// 5. get all service types

const getAllServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await pool.query("SELECT * FROM service_type");
    res.status(200).json(serviceTypes.rows);
  } catch (error) {
    console.log("GET /services/types", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createServiceLog,
  getAllServices,
  updateServiceLog,
  deleteServiceLog,
  getAllServiceTypes,
};
