import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/store";
import { getVehicles } from "../../apis/vehiclesAPI";
import useAuth from "../../hooks/useAuth";
import { useQuery, QueryClient } from "react-query";

const DisplayVehicles = () => {
  const { user_id } = useAuth();
  const [selected, setSelected] = useState(0);
  //   const queryClient = new QueryClient();

  // FIXME: think need to put onsuccess to invalidate query client
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(USERS_KEY);
  //     }
  //   }
  const {
    data: vehiclesData,
    isLoading,
    isError,
    isFetched,
  } = useQuery(
    ["vehicles"],
    async () => await getVehicles({ user_id: user_id })
  );

  // conditional logic rendering here:
  let content;
  if (isLoading) {
    content = <p key={isLoading}>Loading...</p>;
  } else if (isError) {
    content = <p key={isError}>Error</p>;
  } else if (vehiclesData) {
    const vehicle = vehiclesData[selected];
    // content = <div>{vehicle.veh_name}</div>;
    content = (
      <div
        key={selected}
        className="flex items-center justify-between h-28 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <div className="flex-1 p-4 text-center">
          vehicle name: {vehicle.veh_name}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle make: {vehicle.make}
        </div>
        <div className="flex-1 p-4 text-center">
          vehicle model: {vehicle.model}
        </div>
        {/* <button className="btn btn-outline btn-primary">toggle</button> */}
      </div>
    );
    console.log(vehiclesData[0]);
  }

  //   if (isFetched) {
  //     setSelected(queryClient.getQueryCache(["vehicles"]));
  //   }

  return <div>{content}</div>;
};

export default DisplayVehicles;
