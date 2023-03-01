import { useState } from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../apis/usersAPI";
import { NavLink } from "react-router-dom";

// form validation schema using yup
const schema = yup
  .object()
  .shape({
    username: yup.string().min(5).max(30).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required();

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    // reset error/success state
    setError(null);
    setSuccess(null);
    // console.log("form data: ", formData);

    const [data, error] = await registerUser(formData);
    if (error) {
      setError(true);
    }
    if (data) {
      setSuccess(true);
      // console.log("data.message: ", data.message);
    }
    setLoading(false);
    console.log("data2: ", data);
    console.log("error2: ", error);
    // console.log("response: ", data ? data : error.response.data.message);
    // if successful
    // data.status -> "sucess"
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 mt-10 p-5 border border-stone-500 rounded-lg bg-slate-100">
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span>
              <span className="font-medium">Registration Error!</span>{" "}
              Username/email previously used.
            </span>
          </Alert>
        )}
        {success && (
          <Alert
            color="success"
            // onDismiss={() => {
            //   setSuccess(null);
            // }}
          >
            <span>
              <span className="font-medium">Success!</span> User has been added.
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
              <Label value="Email" />
            </div>
            <TextInput
              type="email"
              placeholder="drive@drive.com"
              required={true}
              shadow={true}
              {...register("email")}
            />
            <p className="text-center text-red-600">{errors.email?.message}</p>
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
              "Register new account"
            )}
          </Button>
        </form>

        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default Register;
