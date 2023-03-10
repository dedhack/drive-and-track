import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FuelModal from "./modals/FuelModal";
import VehicleModal from "./modals/VehicleModal";
import MaintenanceModal from "./modals/MaintenanceModal";
import { RiCarLine } from "react-icons/ri";

const TopBar = () => {
  const [fuelVisible, setFuelVisible] = useState(false);
  const [vehicleVisible, setVehicleVisible] = useState(false);
  const [serviceVisible, setServiceVisible] = useState(false);
  const { auth, selectedVehicle, vehicles, vehName, setVehName, isAdmin } =
    useAuth();

  useEffect(() => {
    if (selectedVehicle) {
      vehicles.forEach((vehicle) => {
        if (vehicle.veh_id === selectedVehicle) {
          setVehName(vehicle.veh_name);
        }
      });
    }
  }, [selectedVehicle, vehicles]);

  return (
    <>
      <div className="navbar bg-[#414752] fixed top-0 w-full z-50 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/vehicles">Vehicles</Link>
              </li>
              <li>
                <Link to="/fuel">Fuel</Link>
              </li>
              <li>
                <Link to="/maintenance">Maintenance</Link>
              </li>
              <li tabIndex={0}>
                <Link className="justify-between" to="/charts">
                  Charts
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </Link>
                <ul className="p-2">
                  <li>
                    <Link to="/fuel-charts">Fuel</Link>
                  </li>
                  <li>
                    <Link to="/maintenance-charts">Maintenance</Link>
                  </li>
                </ul>
              </li>
              {isAdmin ? (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              ) : null}
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>

          {auth ? (
            <div className="btn btn-ghost normal-case text-xl">
              drive & track
            </div>
          ) : (
            <Link className="btn btn-ghost normal-case text-xl" to="/login">
              drive & track
            </Link>
          )}
        </div>

        {auth ? (
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/vehicles">Vehicles</Link>
              </li>
              <li>
                <Link to="/fuel">Fuel</Link>
              </li>
              <li>
                <Link to="/maintenance">Maintenance</Link>
              </li>
              {/* <li tabIndex={0}>
                <Link to="/charts">
                  Charts
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Link>
                <ul className="p-2">
                  <li>
                    <Link to="/charts">Overall</Link>
                  </li>
                  <li>
                    <Link to="/fuel-charts">Fuel</Link>
                  </li>
                  <li>
                    <Link to="/maintenance-charts">Maintenance</Link>
                  </li>
                </ul>
              </li> */}
              {isAdmin ? (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              ) : null}
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : null}

        {auth ? (
          <div className="navbar-end">
            {/* <Link className="btn">+</Link> */}
            <Link to="/vehicles">
              <div className="py-3 px-6 bg-neutral rounded-box text-white">
                <RiCarLine />
                {vehName}
              </div>
            </Link>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-neutral m-1.5">
                +
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-neutral text-white rounded-box w-52"
              >
                <li>
                  <button onClick={() => setVehicleVisible(!vehicleVisible)}>
                    Add Vehicle
                  </button>
                </li>
                <li>
                  {/* <button onClick={() => console.log("Add Fuel")}> */}
                  <button onClick={() => setFuelVisible(!fuelVisible)}>
                    Add Fuel
                  </button>
                </li>
                <li>
                  <button onClick={() => setServiceVisible(!serviceVisible)}>
                    Add Maintenance
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {auth ? (
          <>
            <VehicleModal
              visible={vehicleVisible}
              setVisible={setVehicleVisible}
              type={"Register"}
            />
            <FuelModal
              visible={fuelVisible}
              setVisible={setFuelVisible}
              type={"Create"}
            />
            <MaintenanceModal
              visible={serviceVisible}
              setVisible={setServiceVisible}
              type={"Create"}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TopBar;
