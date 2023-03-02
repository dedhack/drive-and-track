import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Main from "./pages/Drive";
import Layout from "./pages/Layout";
import useAuth from "./hooks/useAuth";
import Logout from "./pages/Logout";

function App() {
  const { auth } = useAuth();
  return (
    <div className="h-screen bg-gradient-to-r from-stone-700 to-stone-900">
      <Routes>
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
          <Route path="/home" element={<Home />} />
        </Route>
        {/* error page route */}
      </Routes>
    </div>
  );
}

export default App;
