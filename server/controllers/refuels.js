const pool = require("../db");

// TODO: Pending to include image file upload

//////////////////////////
// 1. create refuel log
const createRefuelLog = async (req, res) => {
  try {
    // destructure incoming data
    const {
      veh_id,
      datetime,
      odometer,
      price,
      location,
      fuel_grade,
      fuel_amount,
      is_full,
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

    const newFuelLog = await pool.query(
      "INSERT INTO refuel_logs (veh_id, datetime, odometer, price, location, fuel_grade, fuel_amount, is_full) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        veh_id,
        datetime,
        odometer,
        price,
        location,
        fuel_grade,
        fuel_amount,
        is_full,
      ]
    );
    res.status(200).json({ status: "success", message: "refuel log created" });
  } catch (error) {
    console.log("PUT /refuels/create", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

//////////////////////////
// 2. get all refuels for particular vehicle
const getAllRefuels = async (req, res) => {
  try {
    // select refuels belonging to user based on user_id and veh_id
    // TODO: do i really need to ensure valid user_id to be secure?
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

    const allRefuels = await pool.query(
      "SELECT * FROM refuel_logs INNER JOIN vehicles ON refuel_logs.veh_id = vehicles.veh_id WHERE vehicles.veh_id = $1 ORDER BY refuel_logs.datetime DESC",
      [veh_id]
    );

    res.status(200).json(allRefuels.rows);
  } catch (error) {
    console.log("GET /refuels/allrefuels", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// update refuel log
const updateRefuelLog = async (req, res) => {
  try {
    // destructure incoming data
    const {
      refuel_id,
      datetime,
      odometer,
      price,
      location,
      fuel_grade,
      fuel_amount,
      is_full,
    } = req.body;
    // check if refuel log exists
    const refuelLog = await pool.query(
      "SELECT * FROM refuel_logs WHERE refuel_id = $1",
      [refuel_id]
    );

    if (refuelLog.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "refuel log does not exist" });
    }

    const updatedFuelLog = await pool.query(
      "UPDATE refuel_logs SET datetime = $1, odometer = $2, price = $3, location = $4, fuel_grade = $5, fuel_amount = $6, is_full = $7 WHERE refuel_id = $8 RETURNING *",
      [
        datetime,
        odometer,
        price,
        location,
        fuel_grade,
        fuel_amount,
        is_full,
        refuel_id,
      ]
    );
    // console.log(updatedFuelLog.rows[0])
    res.status(200).json({ status: "success", message: "refuel log updated" });
  } catch (error) {
    console.log("PATCH /refuels/update", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

// delete refuel log
const deleteRefuelLog = async (req, res) => {
  try {
    // destructure incoming data
    const { refuel_id } = req.body;

    // check if refuel log exists
    const refuelLog = await pool.query(
      "SELECT * FROM refuel_logs WHERE refuel_id = $1",
      [refuel_id]
    );

    if (refuelLog.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "refuel log does not exist" });
    }

    const deletedFuelLog = await pool.query(
      "DELETE FROM refuel_logs WHERE refuel_id = $1 RETURNING *",
      [refuel_id]
    );

    // console.log(deletedFuelLog.rows[0])
    res.status(200).json({ status: "success", message: "refuel log deleted" });
  } catch (error) {
    console.log("DELETE /refuels/delete", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createRefuelLog,
  getAllRefuels,
  updateRefuelLog,
  deleteRefuelLog,
};
