import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles, deleteVehicleLog } from "../apis/vehiclesAPI";

const Vehicles = () => {
  const {
    username,
    user_id,
    vehicles,
    setVehicles,
    selectedVehicle,
    setSelectedVehicle,
    setVehName,
  } = useAuth();

  // need an anonymous function to set the state
  const handleToggle = (veh_id) => () => {
    console.log("veh_id: ", veh_id);
    setSelectedVehicle(veh_id);
  };

  const handleUpdate = (veh_id) => {};

  const handleDelete = (veh_id) => async () => {
    const [data, error] = await deleteVehicleLog({ veh_id: veh_id });
    if (data) {
      console.log("vehicle deleted data: ", data);
    }
    // fetch the vehicles again
    const [data2, error2] = await getVehicles({ user_id: user_id });
    if (Array.isArray(data2)) {
      setVehicles(data2);
    } else {
      setVehicles(null);
      setSelectedVehicle(null);
      setVehName(null);
    }
  };

  let content = null;
  if (vehicles) {
    content = vehicles.map((vehicle, index) => {
      return (
        <>
          <div className="flex flex-row m-4 bg-slate-100 justify-around w-full">
            <div className=" p-4 text-center">
              vehicle name: {vehicle.veh_name}
            </div>
            <div className="p-4 text-center">vehicle make: {vehicle.make}</div>
            <div className="p-4 text-center">
              vehicle model: {vehicle.model}
            </div>
            <div>
              <button className="btn" onClick={handleToggle(vehicle.veh_id)}>
                Select
              </button>
              <button className="btn" onClick={handleUpdate(vehicle.veh_id)}>
                Update
              </button>
              <button className="btn" onClick={handleDelete(vehicle.veh_id)}>
                Delete
              </button>
            </div>
          </div>
        </>
      );
    });
  }

  return (
    <div>
      Your Vehicles:
      <div className="flex flex-col items-center justify-between mb-4">
        {content}
      </div>
    </div>
  );
};

export default Vehicles;
