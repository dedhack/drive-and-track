import React from "react";
import MaintDisplay from "../components/home/MaintDisplay";
import DisplayVehicles from "../components/vehicles/DisplayVehicles";

const HomeContent = () => {
  return (
    <div>
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <DisplayVehicles />
          <MaintDisplay />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
