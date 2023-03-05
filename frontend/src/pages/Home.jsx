import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles } from "../apis/vehiclesAPI";

const Home = () => {
  const {
    username,
    user_id,
    vehicles,
    setVehicles,
    selectedVehicle,
    setSelectedVehicle,
  } = useAuth();

  // pull out list of vehicles

  const fetchVehicles = async () => {
    const [data, error] = await getVehicles({ user_id: user_id });

    if (Array.isArray(data)) {
      setVehicles(data);
    } else if (data?.message) {
      console.log("message: ", error);
    }
    // console.log(vehicles);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleToggle = (veh_id) => () => {
    console.log("veh_id: ", veh_id);
    setSelectedVehicle(veh_id);
  };

  let content = null;
  if (vehicles !== null && selectedVehicle !== null) {
    // console.log("vehicles: ", vehicles);
    console.log("vehicles !== null && !selectedVehicle");
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
  } else if (vehicles && selectedVehicle) {
    const chosen = vehicles.filter(
      (vehicle) => vehicle.veh_id === selectedVehicle
    )[0];
    console.log("chosen: ", chosen);
    content = (
      <div>
        <div className="flex flex-row m-4 bg-slate-100 justify-around w-full">
          <div className=" p-4 text-center">
            vehicle name: {chosen.veh_name}
          </div>
          <div className="p-4 text-center">vehicle make: {chosen.make}</div>
          <div className="p-4 text-center">vehicle model: {chosen.model}</div>
        </div>
      </div>
    );
  } else {
    console.log("no vehicles");
    content = <div>no vehicles selected</div>;
  }

  return (
    <div>
      Welcome {username}
      <div className="flex flex-col items-center justify-between mb-4">
        {content}
      </div>
    </div>
  );
};
export default Home;
