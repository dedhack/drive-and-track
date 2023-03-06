import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center text-center">
      <div className="w-96 my-32 p-5 border border-stone-500 rounded-lg bg-primary text-white">
        Logging out..
        <div className="mt-5">
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export default Logout;
