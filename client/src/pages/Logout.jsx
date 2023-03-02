import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

const Logout = () => {
  const { auth, logout } = useAuth();

  useEffect(() => {
    logout();
    if (!auth?.access) {
      setTimeout("logged out...", 5000);
      <Navigate to="/login" replace />;
    }
  }, []);

  return (
    <div className="flex justify-center">
      Logout
      <LoadingButton />
      {/* {!auth?.access ? (setTimeout("logged out...", 5000); <Navigate to="/login" replace />) : null} */}
    </div>
  );
};

export default Logout;
