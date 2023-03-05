import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ErrAlert from "../components/ErrAlert";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { useJwt } from "react-jwt";

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

  // react hook form verification
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { decodedToken, isExpired } = useJwt(auth);

  const onSubmit = async (formData) => {
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
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-96 my-32 p-5 border border-stone-500 rounded-lg bg-stone-300">
          <form
            className="form-control w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl font-bold text-center">Login</h1>
            <div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("username")}
                />
              </div>
              <div className="mb-2 block">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  {...register("password")}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="text-center">
              <button type="submit" className="btn">
                Submit
              </button>
              <Spinner />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
