import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Drive";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-slate-300 to-slate-500">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/main" element={<Main />} />
          </Route>
        </Route>
        {/* error page route */}
      </Routes>
    </div>
  );
}

export default App;
