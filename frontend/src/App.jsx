import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// hooks
import useAuth from "./hooks/useAuth";

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

import RequireAuth from "./components/RequireAuth";
import RequireAuthAdmin from "./components/RequireAuthAdmin";

const App = () => {
  const { auth } = useAuth();

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/fuel" element={<Fuel />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/fuel-charts" element={<FuelCharts />} />
          <Route path="/maintenance-charts" element={<MaintenanceCharts />} />
          <Route path="/logout" element={<Logout />} />

          <Route element={<RequireAuthAdmin />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        {/* TODO: Error page */}
      </Routes>
    </>
  );
};

export default App;
