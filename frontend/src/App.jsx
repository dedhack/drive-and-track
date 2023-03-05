import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";

const App = () => {
  const { auth } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
