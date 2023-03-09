import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { refreshToken } from "../apis/usersAPI";
import { useJwt } from "react-jwt";

const RequireAuth = () => {
  const refToken = localStorage.getItem("refresh");
  const { auth, setAuth, logout } = useAuth();
  const location = useLocation();

  console.log("Require Auth Middleware");

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
