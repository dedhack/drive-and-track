import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// hooks
import useAuth from "./hooks/useAuth";
import { useJwt } from "react-jwt";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Fuel from "./pages/Fuel";
import Maintenance from "./pages/Maintenance";
import Charts from "./pages/Charts";
import FuelCharts from "./pages/FuelCharts";
import MaintenanceCharts from "./pages/MaintenanceCharts";
import TopBar from "./components/TopBar";
import Logout from "./pages/Logout";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";

import RequireAuth from "./components/RequireAuth";
import RequireAuthAdmin from "./components/RequireAuthAdmin";
import { refreshToken } from "./apis/usersAPI";
import RefreshAuth from "./components/RefreshAuth";

const refToken = localStorage.getItem("refresh");
// const accToken = localStorage.getItem("access");

const App = () => {
  // handle tokens

  const { auth, setAuth, logout } = useAuth();
  const { isExpired, reEvaluateToken } = useJwt(auth);
  const { isExpired: isExpiredRef } = useJwt(refToken);
  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RefreshAuth />}>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/fuel" element={<Fuel />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/fuel-charts" element={<FuelCharts />} />
            <Route path="/maintenance-charts" element={<MaintenanceCharts />} />
            <Route path="/logout" element={<Logout />} />

            {/* Admin Protected Route */}
            <Route element={<RequireAuthAdmin />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>

        {/* TODO: Error page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
};

export default App;
