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

const getAllServices = async (req, res) => {};

// 3. update service log

const updateServiceLog = async (req, res) => {};

// 4. delete service log

const deleteServiceLog = async (req, res) => {};

module.exports = {
  createServiceLog,
  getAllServices,
  updateServiceLog,
  deleteServiceLog,
};
