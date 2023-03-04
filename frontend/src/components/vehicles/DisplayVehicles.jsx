import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/store";
import { getVehicles } from "../../apis/vehiclesAPI";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "react-query";

const DisplayVehicles = () => {
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
    const vehicle = selected[selectedVehicle];
    content = (
      <div className="flex items-center justify-between h-28 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <div className="flex-1 p-4 text-center">
          vehicle name: {vehicle.veh_name}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle make: {vehicle.make}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle model: {vehicle.model}
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default DisplayVehicles;
