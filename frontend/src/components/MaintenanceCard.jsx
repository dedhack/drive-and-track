import React from "react";

const MaintenanceCard = ({ service, conDate }) => {
  return (
    <>
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-gray-900 "></div>

      {/* <p className="mb-1 text-sm font-normal leading-none text-gray-600">
        {conDate} @ <span className="font-bold">{service.location}</span>
      </p>
      <h3 className="text-lg font-semibold text-gray-900 ">
        Odometer: {service.odometer} km
      </h3>
      <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
        ${service.price}, {service.service_type}
      </p>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {service.service_desc}
      </p> */}
      {/* TESTING CARDS */}
      <div className="card w-96 bg-neutral text-neutral-content hover:bg-neutral-focus">
        <div className="card-body">
          <p className="mb-1 text-sm font-normal leading-none text-[#FF79C6]">
            {conDate} @{" "}
            <span className="font-bold italic underline">
              {service.location}
            </span>
          </p>
          <p className="text-base font-semibold ">
            Odometer: {service.odometer} km
          </p>
          <p className="mb-2 text-base font-normal">
            ${service.price}, {service.service_type}
          </p>
          <p className="mb-4 text-sm font-normal italic text-gray-200 ">
            {service.service_desc}
          </p>
        </div>
      </div>
    </>
  );
};

export default MaintenanceCard;
