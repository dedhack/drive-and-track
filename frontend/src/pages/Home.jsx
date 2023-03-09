import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles } from "../apis/vehiclesAPI";
import { Link } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
const Home = () => {
  const {
    auth,
    username,
    user_id,
    vehicles,
    setVehicles,
    selectedVehicle,
    setSelectedVehicle,
  } = useAuth();

  // pull out list of vehicles

  const fetchVehicles = async () => {
    const [data, error] = await getVehicles({ user_id: user_id }, auth);

    if (Array.isArray(data)) {
      setVehicles(data);
    } else if (data?.message) {
      console.log("message: ", error);
    }
    // console.log(vehicles);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  //FIXME: unused. now we control this only in the vehicles page
  //TODO: how about redirecting to vehicles page, and if no vehicles selected, unable to go to other pages?
  // const handleToggle = (veh_id) => () => {
  //   console.log("veh_id: ", veh_id);
  //   setSelectedVehicle(veh_id);
  // };

  let content = null;
  let content2 = null;
  if (vehicles && selectedVehicle !== null) {
    const chosen = vehicles.filter(
      (vehicle) => vehicle.veh_id === selectedVehicle
    )[0];
    console.log("chosen: ", chosen);
    content = <VehicleCard vehicle={chosen} />;
  } else {
    console.log("no vehicles");
    content2 = (
      <div className="card w-96 bg-neutral shadow-xl text-white">
        <div className="card-body text-center">
          <p>You have not selected any vehicles</p>
        </div>
        <Link className="link link-success text-center p-4" to="/vehicles">
          <button className="">Click here to select a vehicle</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-500 h-screen">
      <div className="flex justify-center">
        <div className="mt-24">{content2}</div>
      </div>
      <div className="grid grid-cols-4 p-4">
        <div className="">{content}</div>

        {/* No. of Vehicles */}
        {vehicles && selectedVehicle !== null ? (
          <div className="flex flex-row space-x-4 px-4">
            <div>
              <div className="card w-64 bg-neutral shadow-xl text-white">
                <div className="card-body text-center">
                  <h3 className="font-bold text-4xl">{vehicles.length}</h3>
                  <p className="text-sm">Vehicles</p>
                </div>
              </div>
            </div>

            {/* CARD USER INFO */}
            <div>
              <div className="card w-64 bg-neutral shadow-xl text-white">
                <div className="card-header">
                  <h4 className="font-bold text-lg text-center">
                    User Information
                  </h4>
                </div>
                <div className="card-body">
                  <p>Username: {username}</p>
                  <p>User ID: {user_id}</p>
                </div>
              </div>
            </div>
            {/* CARD VEHICLE */}
            <div>
              <div className="card w-64 bg-neutral shadow-xl text-white text-center">
                <div className="card-header">
                  <h4 className="font-bold text-lg">Update Vehicle?</h4>
                </div>
                <div className="card-body">
                  <Link
                    className="link link-success text-center p-4"
                    to="/vehicles/new"
                  >
                    <button className="">
                      Click here to manage your vehicles
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <div className="card w-64 bg-neutral shadow-xl text-white text-center">
                  COST COMPARISON CHART between fuel and maintenance
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Home;
