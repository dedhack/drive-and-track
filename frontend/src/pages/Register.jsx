import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import ErrAlert from "../components/ErrAlert";
import { registerUser } from "../apis/usersAPI";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    username: yup.string().min(5).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required();

const Register = () => {
  const { setAuth, setEmail, setUsername, setUser_id, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    const [data, error] = await registerUser(formData);
    if (data) {
      setSuccess("User registered successfully");
      navigate("/login", { replace: true });
    }
    if (error) {
      setError(error.response.data.message);
    }
    console.log("data: ", data);
    console.log("error: ", error);
    setLoading(false);
  };

  return (
    <div className="bg-gray-500 h-screen">
      <div className="flex justify-center">
        <div className="w-96 my-32 p-5 border border-white rounded-lg bg-[#414752] text-white">
          {error ? <ErrAlert text={error} /> : null}
          <form
            className="form-control w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl font-bold text-center ">Register</h1>
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
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="j.cena@wwe.com"
                  className="input input-bordered w-full text-black"
                  {...register("email")}
                />
                <p className="text-center text-red-600">
                  {errors.email?.message}
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
                {loading ? <Spinner /> : "Register"}
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            <NavLink
              className="font-medium text-white hover:underline "
              to="/login"
            >
              To login page
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
