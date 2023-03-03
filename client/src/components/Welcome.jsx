import { useSelector } from "react-redux";
import { selectCurrentUser, selectAccessToken } from "../features/authSlice";
import { Link } from "react-router-dom";

import React from "react";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);

  const welcome = token ? `Welcome ${user}` : "Welcome Guest";
  const tokenAbbr = `${token.slice(0, 9)}...}`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Your token is: {tokenAbbr}</p>
      <p>
        {" "}
        <Link to="/userslist"> Go to the users list</Link>{" "}
      </p>
    </section>
  );

  return content;
};

export default Welcome;
