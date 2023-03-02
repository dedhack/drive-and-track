import React from "react";
// import { useAppStore } from "../stores/appStore";
import { useJwt } from "react-jwt";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  //   const { decodedToken, isExpired } = useJwt(auth.access);
  //   console.log("decodedToken: ", decodedToken);

  // fetch user vehicles

  // fetch user refuels

  // fetch user maintenance

  // fetch weather info

  return (
    <>
      <div className="h-full p-4 sm:ml-64 bg-stone-900">
        <div className="flex items-center justify-center h-20 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">VEHICLE</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
