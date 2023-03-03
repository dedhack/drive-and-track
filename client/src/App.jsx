import "./App.css";
import ProfileCard from "./components/ProfileCard";
import { Routes, Route } from "react-router-dom";

// components
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Public from "./components/Public";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          <Route path="profile" element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
