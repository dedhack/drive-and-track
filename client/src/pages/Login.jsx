import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../apis/usersAPI";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useAppStore } from "../stores/appStore";
import useAuth from "../hooks/useAuth";
// form validation schema using yup
const schema = yup
  .object()
  .shape({
    username: yup.string().min(5).max(30).required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required();

const Login = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  //TODO: try to use zustand
  // const setAccessToken = useAppStore((state) => state.setAccessToken);
  // const setRefreshToken = useAppStore((state) => state.setRefreshToken);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();

  // form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log(formData);
    const [data, error] = await loginUser(formData);
    if (error) {
      setError(true);
    }
    if (data) {
      setSuccess(true);
      // setAccessToken(data.accessToken); //TODO: try to use zustand
      // setRefreshToken(data.refreshToken);
      setAuth(data);
      localStorage.setItem("refresh", data.refresh);
      navigate(from, { replace: true });
    }
    setLoading(false);
    console.log("data2: ", data);
    console.log("error2: ", error);
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 mt-10 p-5 border border-stone-500 rounded-lg bg-slate-100">
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span>
              <span className="font-medium">Login Error!</span> Please try
              again.
            </span>
          </Alert>
        )}
        {success && (
          <Alert color="success">
            <span>
              <span className="font-medium">Success!</span> Logging in...
            </span>
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-2 block">
              <Label value="Username" />
            </div>
            <TextInput
              type="text"
              required={true}
              shadow={true}
              {...register("username")}
            />
            <p className="text-center text-red-600">
              {errors.username?.message}
            </p>
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Password" />
            </div>
            <TextInput
              type="password"
              required={true}
              shadow={true}
              {...register("password")}
            />
            <p className="text-center text-red-600">
              {errors.password?.message}
            </p>
          </div>

          <Button color="dark" type="submit">
            {loading ? (
              <>
                <Spinner aria-label="Spinner button example" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <NavLink className="" to="/register">
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
