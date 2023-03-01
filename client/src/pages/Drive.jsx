import React, { useEffect } from "react";
import { refreshToken } from "../apis/usersAPI";
import useAuth from "../hooks/useAuth";

const Drive = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const refresh = async () => {
      console.log("auth refresh: ", auth.refresh);
      const [data, error] = await refreshToken({ refresh: auth.refresh });
      if (error) {
        console.log("error: ", error);
      }
      if (data) {
        console.log("data: ", data);
        setAuth(data);
      }
    };

    refresh();
  }, []);

  return <div>Drive</div>;
};

export default Drive;
