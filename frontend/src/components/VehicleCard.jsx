import React from "react";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="card card-compact  bg-neutral text-white text-left shadow-xl border-4">
      <figure>
        <img
          src="https://www.suzukiauto.co.za/hubfs/Swift-Sport_Front_5.png"
          alt="Suzuki Swift"
          className=""
        />
      </figure>
      <div className="card-body border-t-2">
        <h2 className="card-title text-center">{vehicle.veh_name}</h2>
        <p className="text-base">
          <span className="font-bold">Make: </span>
          {vehicle.make}
        </p>
        <p className="text-base">
          <span className="font-bold">Model: </span>
          {vehicle.model}
        </p>
        <p className="text-base">
          <span className="font-bold">Year: </span>
          {vehicle.year}
        </p>
        <p className="text-base">
          <span className="font-bold">Capacity: </span>
          {vehicle.capacity} L
        </p>
        <p className="text-base">
          <span className="font-bold">Description: </span>
          {vehicle.veh_desc}
        </p>
        <p className="text-base">
          <span className="font-bold">Insurance Policy: </span>
          {vehicle.ins_pol}
        </p>
        <p className="text-base">
          <span className="font-bold">VIN: </span>
          {vehicle.vin}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
