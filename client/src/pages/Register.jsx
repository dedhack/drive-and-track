import React from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex justify-center">
      <div className="w-96 mt-10 p-5 border border-stone-500 rounded-lg bg-slate-100">
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

          <div className="flex items-center gap-2"></div>
          <Button color="dark" type="submit">
            Register new account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
