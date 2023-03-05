import React, { useEffect, useState } from "react";

import { getVehicles } from "../../apis/vehiclesAPI";
import useAuth from "../../hooks/useAuth";

const DisplayVehicles = () => {
  const {
    user_id,
    selectedVehicle,
    setSelectedVehicle,
    setVehicles,
    vehicles,
  } = useAuth();
  // const [selected, setSelected] = useState(null);

  // assume data is stored into our state to ensure re-render

  return (
    <div className="m-4 p-4">
      <div className="flex items-center justify-between mb-4 rounded bg-base-300">
        {content}
      </div>
    </div>
  );
};

export default DisplayVehicles;
