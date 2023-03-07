import React from "react";
import { Link } from "react-daisyui";

const FuelCard = ({ fuel, conDate }) => {
  return (
    <>
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-gray-900 "></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-600">
        {conDate}, {fuel.location}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Odometer: {fuel.odometer} km
      </h3>
      <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        ${fuel.price}, {fuel.fuel_amount} L
      </p>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {fuel.price}, {fuel.fuel_amount}
      </p>
    </>
  );
};

export default FuelCard;
