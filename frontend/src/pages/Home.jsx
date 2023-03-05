import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles } from "../apis/vehiclesAPI";
const Home = () => {
  const { username, user_id, vehicles, setVehicles } = useAuth();

  // pull out list of vehicles

  const fetchVehicles = async () => {
    const [data, error] = await getVehicles({ user_id: user_id });
    if (data) {
      setVehicles(data);
    }
    console.log(vehicles);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return <div>Welcome {username}</div>;
};

export default Home;
