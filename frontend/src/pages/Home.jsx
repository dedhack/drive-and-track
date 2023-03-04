// import { Navbar } from "flowbite-react";
import React from "react";
// import { useAppStore } from "../stores/appStore";
import { useJwt } from "react-jwt";
import Side from "../components/Side";
import useAuth from "../hooks/useAuth";
import TopBar from "../components/TopBar";
import HomeContent from "./HomeContent";
import { useQuery, useQueryClient } from "react-query";
import { getVehicles } from "../apis/vehiclesAPI";
import { axiosClient } from "../apis/usersAPI";

const Home = () => {
  // const { auth } = useAuth();
  //   const { decodedToken, isExpired } = useJwt(auth.access);
  //   console.log("decodedToken: ", decodedToken);

  const userData = {
    user_id: "679460b7-84f8-44be-bb1b-50d3a50c04cc",
  };
  // fetch user vehicles
  // const queryClient = useQueryClient();
  const {
    data: vehiclesData,
    isLoading,
    isError,
  } = useQuery(["vehicles"], async () => await getVehicles(userData));
  console.log("vehiclesData: ", vehiclesData);

  // test fetch

  // const {
  //   data: test,
  //   isLoading,
  //   isError,
  // } = useQuery(["test"], () => axiosClient.get("test"));

  // fetch user refuels

  // fetch user maintenance

  // fetch weather info
  // if (isLoading) return "Loading...";

  return (
    <div>
      <TopBar />
      {/* <HomeContent /> */}
      {vehiclesData ? (
        vehiclesData.map((vehicle) => <p key={vehicle.id}>{vehicle.make}</p>)
      ) : (
        <p>Loading</p>
      )}
      {/* {test ? test.data : <div>Loading</div>} */}
    </div>
  );
};

export default Home;
