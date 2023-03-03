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

import { useUser } from "./hooks/store";

function App() {
  // const { auth } = useAuth();
  const auth = useUser((state) => state.accessToken);

  return (
    <div className="h-screen bg-stone-900">
      {/* <Drop />
      <ProfileCard /> */}

      <Routes>
        <Route path="/login" element={<Login />} />

        {!auth ? (
          <Route path="/" element={<Navigate replace to="/login" />} />
        ) : (
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        )}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}

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
