import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Pages
import Drop from "./components/Drop";

// Context Hooks
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import RequireAuth from "./components/RequireAuth";
import Side from "./components/Side";

function App() {
  const { auth } = useAuth();

  return (
    <div className="h-screen bg-stone-900">
      {/* <Drop />
      <ProfileCard /> */}
      <Side />

      {auth.access && <Side />}

      <Routes>
        <Route path="/home" element={<Home />} />

        {!auth.access ? (
          <Route path="/" element={<Navigate replace to="/login" />} />
        ) : (
          <Route element={<RequireAuth />}></Route>
        )}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          {/* <Route path="/home" element={<Home />} /> */}
        </Route>
        {/* error page route */}
      </Routes>
    </div>
  );
}

export default App;
