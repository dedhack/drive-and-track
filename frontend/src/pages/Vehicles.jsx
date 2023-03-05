import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles } from "../apis/vehiclesAPI";

const Vehicles = () => {
  const {
    username,
    user_id,
    vehicles,
    setVehicles,
    selectedVehicle,
    setSelectedVehicle,
  } = useAuth();

  const handleToggle = (veh_id) => () => {
    console.log("veh_id: ", veh_id);
    setSelectedVehicle(veh_id);
  };

  let content = null;
  if (vehicles) {
    // console.log("vehicles: ", vehicles);
    content = vehicles.map((vehicle, index) => {
      return (
        <div className="flex flex-row m-4 bg-slate-100 justify-around w-full">
          <div className=" p-4 text-center">
            vehicle name: {vehicle.veh_name}
          </div>
          <div className="p-4 text-center">vehicle make: {vehicle.make}</div>
          <div className="p-4 text-center">vehicle model: {vehicle.model}</div>
          <button className="btn" onClick={handleToggle(vehicle.veh_id)}>
            Select
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      Your Vehicles:
      {content}
    </div>
  );
};

export default Vehicles;
