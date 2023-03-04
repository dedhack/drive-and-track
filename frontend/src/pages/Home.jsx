// import { Navbar } from "flowbite-react";
import React from "react";
// import { useAppStore } from "../stores/appStore";
import { useJwt } from "react-jwt";
import Side from "../components/Side";
import useAuth from "../hooks/useAuth";
import TopBar from "../components/TopBar";
import HomeContent from "./HomeContent";
import { useQuery, useQueryClient } from "react-query";
// import { getVehicles } from "../apis/vehiclesAPI";
import { axiosClient } from "../apis/usersAPI";
import DisplayVehicles from "../components/vehicles/DisplayVehicles";
import FuelMaintDisplay from "../components/home/FuelMaintDisplay";

const Home = () => {
  // fetch user refuels

  // fetch user maintenance

  // fetch weather info
  // if (isLoading) return "Loading...";

  return (
    <div>
      <HomeContent />
      <FuelMaintDisplay />
      {/* {vehiclesData ? (
        vehiclesData.map((vehicle) => <p key={vehicle.id}>{vehicle.make}</p>)
      ) : (
        <p>Loading</p>
      )} */}
    </div>
  );
};

export default Home;
