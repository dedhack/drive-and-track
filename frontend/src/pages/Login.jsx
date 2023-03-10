import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ErrAlert from "../components/ErrAlert";

import axios from "axios";

const schema = yup
  .object()
  .shape({
    username: yup.string().min(5).max(30).required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required();

const Login = () => {
  const { auth, setAuth, setEmail, setUsername, setUser_id, setIsAdmin } =
    useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // react hook form verification
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    console.log("formData: ", formData);
    try {
      const res = await axios.post(
        "http://localhost:5001/users/login",
        formData
      );
      console.log("data: ", res.data);
      if (res.data) {
        console.log("inside if: ", res.data);
        const data = res.data;
        setAuth(data.access);
        setUsername(data.username);
        setEmail(data.email);
        setUser_id(data.user_id);
        setIsAdmin(data.is_Admin);
        localStorage.setItem("refresh", data.refresh);
        // localStorage.setItem("access", data.access); // FIXME: temporarily to allow easy access to access token
        navigate("/home", { replace: true });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <>
      {auth ? (
        navigate("/home", { replace: true })
      ) : (
        <div className="bg-gray-500 h-screen">
          <div className="flex justify-center ">
            <div className="w-96 my-32 p-5 border border-white rounded-lg bg-[#414752] text-white">
              {/* {errors?.username || errors?.password ? (
          <ErrAlert text="Invalid username or password" />
        ) : null} */}
              {error ? <ErrAlert text={error} /> : null}

              <form
                className="form-control w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h1 className="text-3xl font-bold text-center animate-pulse">
                  Login
                </h1>
                <div>
                  <div className="mb-2 block">
                    <label className="label">
                      <span className="label-text text-white">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full text-black"
                      {...register("username")}
                    />
                    <p className="text-center text-red-600">
                      {errors.username?.message}
                    </p>
                  </div>
                  <div className="mb-2 block">
                    <label className="label">
                      <span className="label-text text-white">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Type here"
                      className="input input-bordered w-full text-black"
                      {...register("password")}
                    />
                    <p className="text-center text-red-600">
                      {errors.password?.message}
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <div className="text-center pt-10">
                  <button
                    type="submit"
                    className="btn btn-outline btn-wide text-white"
                  >
                    {loading ? <Spinner /> : "Login"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-5">
                <NavLink
                  className="font-medium text-[#523D4F]hover:underline"
                  to="/register"
                >
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
