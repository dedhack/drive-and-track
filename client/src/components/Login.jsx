import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
// import { useLoginMutation } from "../features/authApiSlice";
// import { useLoginUserMutation } from "../features/apiSlice";
import { useGetTestQuery, useLoginUserMutation } from "../features/testSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const { data: testMsg, isLoading: testLoading, isError } = useGetTestQuery();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginUser({ username, password }).unwrap();
      // dispatch(setCredentials(userData));
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (error.status === 401) {
        setErrMsg("Invalid credentials");
      } else {
        setErrMsg("An error occurred. Please try again later.");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleTest = async (e) => {
    console.log("test");
    // await testMsg;
    await loginUser;
    await data;
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
      <button onClick={(e) => handleTest(e)}>test</button>
      {/* {testLoading && <p>Loading...</p>} */}
    </section>
  );

  return content;
};

export default Login;
