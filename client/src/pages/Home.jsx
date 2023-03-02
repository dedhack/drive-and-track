import React from "react";
import { useAppStore } from "../stores/appStore";
import { useJwt } from "react-jwt";
import useAuth from "../hooks/useAuth";
const Home = () => {
  const { auth } = useAuth();
  const { decodedToken, isExpired } = useJwt(auth.access);
  console.log("decodedToken: ", decodedToken);

  return (
    <div>
      {decodedToken && <div>Access token info : {decodedToken.is_Admin}</div>}
    </div>
  );
};

export default Home;
