import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refreshToken } from "../apis/usersAPI";
import { useJwt } from "react-jwt";

const RequireAuth = () => {
  const refToken = localStorage.getItem("refresh");
  const { auth, setAuth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Require Auth Middleware");
  // const { isExpired } = useJwt(auth);
  // console.log("access token expired? : ", isExpired);

  // useEffect(() => {
  //   if (isExpired) {
  //     console.log("access expired");
  //   } else {
  //     console.log("access not expired");
  //   }
  // }, []);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
