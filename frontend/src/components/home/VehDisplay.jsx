import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const VehDisplay = () => {
  const fetchVehicles = async () => {
    const res = await axios.post("http://localhost:8000/api/allvehicles/", {
      user_id: "679460b7-84f8-44be-bb1b-50d3a50c04cc",
    });
    return res.json();
  };

  const { data, status } = useQuery("vehiclesInfo");

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div>
      {data.results.map((vehicle) => (
        <div key={vehicle.id}>
          <h1>{vehicle.make}</h1>
        </div>
      ))}
    </div>
  );
};

export default VehDisplay;
