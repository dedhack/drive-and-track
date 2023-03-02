import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

const Logout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const redirect = () => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);
  };
  useEffect(() => {
    logout();
    redirect();
  }, []);

  return (
    <div className="flex justify-center">
      <LoadingButton text="Logging out..." />
    </div>
  );
};

export default Logout;
