import React from "react";

const FuelCard = ({ fuel, conDate }) => {
  return (
    <>
      {/* <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-gray-900 "></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-600">
        {conDate}, {fuel.location}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Odometer: {fuel.odometer} km
      </h3>
      <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        ${fuel.price}, {fuel.fuel_amount} L
      </p> */}
      <div className="  absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-gray-900 "></div>

      <div
        tabIndex={0}
        className="collapse card w-96 bg-neutral text-neutral-content hover:bg-neutral-focus"
      >
        <div className="card-body ">
          <p className="mb-1 text-sm font-normal leading-none text-[#FF79C6]">
            {conDate} @{" "}
            <span className="font-bold italic underline">{fuel.location}</span>
          </p>
          <p className="text-base font-semibold ">
            Odometer: {fuel.odometer} km
          </p>
          <p className="mb-0 text-base font-normal">
            ${fuel.price}, {fuel.fuel_amount} L
          </p>
          {/* Collapse here */}

          <div className="collapse-content">
            <p className="mb-1 text-sm font-normal italic text-gray-200 ">
              {fuel.fuel_grade}
            </p>
            <p className="mb-1 text-sm font-normal italic text-gray-200 ">
              {fuel.is_full ? "Full tank" : "Partially filled"}
            </p>
          </div>

          {/* Collapse end here */}
        </div>
      </div>
    </>
  );
};

export default FuelCard;
