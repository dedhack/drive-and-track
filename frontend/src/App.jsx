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

const App = () => {
  const { auth } = useAuth();

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/fuel-charts" element={<FuelCharts />} />
        <Route path="/maintenance-charts" element={<MaintenanceCharts />} />
      </Routes>
    </>
  );
};

export default App;
