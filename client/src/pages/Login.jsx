import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
