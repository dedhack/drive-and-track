// import { Navbar } from "flowbite-react";
import React from "react";
// import { useAppStore } from "../stores/appStore";
import { useJwt } from "react-jwt";
import Side from "../components/Side";
import useAuth from "../hooks/useAuth";
import TopBar from "../components/TopBar";

const Home = () => {
  // const { auth } = useAuth();
  //   const { decodedToken, isExpired } = useJwt(auth.access);
  //   console.log("decodedToken: ", decodedToken);

  // fetch user vehicles

  // fetch user refuels

  // fetch user maintenance

  // fetch weather info

  return (
    <div>
      <TopBar />
      <h1>HOME SWEET HOME</h1>
    </div>
  );
};

export default Home;
