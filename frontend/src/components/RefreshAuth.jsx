import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { refreshToken } from "../apis/usersAPI";
// import { useJwt } from "react-jwt";

const refresh = localStorage.getItem("refresh");

const RefreshAuth = () => {
  const { auth, setAuth, setUsername, setEmail, setUser_id, setIsAdmin } =
    useAuth();
  //   const { decodedToken } = useJwt(refresh);
  //   console.log("decodedToken: ", decodedToken);

  const checkToken = async () => {
    const [data, error] = await refreshToken({ refresh: refresh }, auth);
    if (data) {
      console.log("we're in here");
      console.log("new access token", data);
      setAuth(data.access);
      setUsername(data.username);
      setEmail(data.email);
      setUser_id(data.user_id);
      setIsAdmin(data.is_Admin);
    }
  };

  useEffect(() => {
    checkToken();
    console.log("refreshing auth...");
  }, [auth]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RefreshAuth;
