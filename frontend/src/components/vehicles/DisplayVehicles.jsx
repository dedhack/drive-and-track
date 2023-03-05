import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/store";
import { getVehicles } from "../../apis/vehiclesAPI";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "react-query";

const DisplayVehicles = () => {
  const {
    user_id,
    selectedVehicle,
    setSelectedVehicle,
    setVehicles,
    vehicles,
  } = useAuth();
  // const [selected, setSelected] = useState(null);

  const {
    data: vehiclesData,
    isLoading,
    isError,
  } = useQuery(["vehicles"], () => getVehicles({ user_id }), {
    // enabled option is used to prevent the query from running on initial render
    // prevent the query from running if user_id is falsy
    enabled: !!user_id,
  });

  useEffect(() => {
    if (vehiclesData?.length > 0) {
      setVehicles(vehiclesData);
      if (selectedVehicle === null) {
        setSelectedVehicle(vehiclesData[0].veh_id);
      }
    }
  }, [vehiclesData]);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  }

  // assume data is stored into our state to ensure re-render
  if (vehicles) {
    const vehicle = vehicles.filter(
      (vehicle) => vehicle.veh_id == selectedVehicle
    );
    console.log(vehicle);
    content = (
      <>
        <div className="flex-1 p-4 text-center">
          vehicle name: {vehicle.veh_name}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle make: {vehicle.make}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle model: {vehicle.model}
        </div>
      </>
    );
  }

  return (
    <div className="m-4 p-4">
      <div className="flex items-center justify-between mb-4 rounded bg-base-300">
        {content}
      </div>
    </div>
  );
};

export default DisplayVehicles;
