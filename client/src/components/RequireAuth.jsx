import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../features/authSlice";

export const RequireAuth = () => {
  const token = useSelector(selectAccessToken);
  const location = useLocation();

  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      )}
    </>
  );
};

export default RequireAuth;
