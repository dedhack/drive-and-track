import React from "react";
import MaintDisplay from "../components/home/MaintDisplay";
import DisplayVehicles from "../components/vehicles/DisplayVehicles";

const Home = () => {
  return (
    <div className="p-4">
      <div className="p-4 border-2 border-gray-900 rounded-lg ">
        <DisplayVehicles />

        <div className="flex flex-col justify-around">
          {/* <MaintDisplay />
          <MaintDisplay /> */}
        </div>

        {/* <div className="flex items-center justify-between mb-4 h-40 rounded bg-gray-50 dark:bg-gray-800">
          <div className="flex-1 p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Fuel
            </h2>
          </div>
          <div className="flex-1 p-4 text-center over">
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
