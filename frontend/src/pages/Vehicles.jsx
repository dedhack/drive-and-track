import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useAuth from "../hooks/useAuth";
import { getVehicles } from "../apis/vehiclesAPI";

const Vehicles = () => {
  const { user_id, selectedVehicle } = useAuth();
  const [selected, setSelected] = useState(null);

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
      setSelected(vehiclesData);
    }
  }, [vehiclesData]);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  } else if (selected) {
    // const vehicle = selected[selectedVehicle];
    content = vehiclesData.map((vehicle) => (
      <>
        <div className="card w-full bg-primary text-primary-content">
          <div className="card-body rounded-xl dark:bg-gray-800 ">
            <h2 className="card-title">{vehicle.veh_name}</h2>
            <p>
              <span className="font-bold">Make: </span>
              {vehicle.make}
            </p>
            <p>
              <span className="font-bold">Model:</span> {vehicle.model}
            </p>
            <div className="card-actions justify-end">
              <button className="btn">Edit</button>
            </div>
          </div>
        </div>
      </>
    ));

    return (
      <div className="flex flex-col gap-4 p-4 items-center  justify-between rounded ">
        Your Vehicles
        {content}
      </div>
    );
  }
};

export default Vehicles;
