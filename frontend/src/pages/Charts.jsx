import React from "react";
import useAuth from "../hooks/useAuth";
const Charts = () => {
  const { fuelLogs, serviceLogs } = useAuth();

  // map the fuel logs to an array of objects with the following structure:
  const fuelData = fuelLogs.map((log) => {
    return (
      <div>
        <h1>Fuel Data</h1>
        <p>date: {log.datetime}</p>
        <p>odometer: {log.odometer}</p>
        <p>price: {log.price}</p>
        <p>litres: {log.litres}</p>
      </div>
    );
  });

  return <div>Charts{fuelData}</div>;
};

export default Charts;
