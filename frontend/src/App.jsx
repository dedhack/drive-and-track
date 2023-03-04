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
import TopBar from "./components/TopBar";

function App() {
  const { auth } = useAuth();
  // const auth = useUser((state) => state.accessToken);

  return (
    <div className="">
      {/* <Drop />
      <ProfileCard /> */}
      {/* {auth ? <TopBar /> : ""} */}
      <TopBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        {!auth ? (
          <Route path="/" element={<Navigate replace to="/login" />} />
        ) : (
          <Route element={<RequireAuth />}>
            {/* Protected routes inside here */}
            <Route path="/logout" element={<Logout />} />
          </Route>
        )}

        {/* error page route */}
      </Routes>
    </div>
  );
}

export default App;
