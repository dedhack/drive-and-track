import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getVehicles, deleteVehicleLog } from "../apis/vehiclesAPI";
import VehicleModal from "../components/modals/VehicleModal";
import VehicleCard from "../components/VehicleCard";
const Vehicles = () => {
  const {
    user_id,
    vehicles,
    setVehicles,
    selectedVehicle,
    setSelectedVehicle,
    setVehName,
    auth,
  } = useAuth();
  const [vehicleVisible, setVehicleVisible] = useState(false);
  const [updateVehicle, setUpdateVehicle] = useState(null);

  // need an anonymous function to set the state
  const handleToggle = (veh_id) => () => {
    console.log("veh_id: ", veh_id);
    setSelectedVehicle(veh_id);
  };

  const handleUpdate = (veh_id) => async () => {
    setUpdateVehicle(veh_id);
    setVehicleVisible(true);
  };

  const handleDelete = (veh_id) => async () => {
    const [data, error] = await deleteVehicleLog({ veh_id: veh_id }, auth);
    if (data) {
      console.log("vehicle deleted data: ", data);
    }
    // fetch the vehicles again
    const [data2, error2] = await getVehicles({ user_id: user_id }, auth);
    if (Array.isArray(data2)) {
      setVehicles(data2);
    } else {
      setVehicles(null);
      setSelectedVehicle(null);
      setVehName(null);
    }
  };

  let content = null;
  if (vehicles) {
    content = vehicles.map((vehicle, index) => {
      return (
        <div key={index}>
          <div className="card card-compact w-96 bg-base-200 shadow-xl border-4">
            <figure>
              <img
                src="https://www.suzukiauto.co.za/hubfs/Swift-Sport_Front_5.png"
                alt="Suzuki Swift"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">{vehicle.veh_name}</h2>
              <p className="text-base">
                <span className="font-bold">Make: </span>
                {vehicle.make}
              </p>
              <p className="text-base">
                <span className="font-bold">Model: </span>
                {vehicle.model}
              </p>
              <p className="text-base">
                <span className="font-bold">Year: </span>
                {vehicle.year}
              </p>
              <p className="text-base">
                <span className="font-bold">Capacity: </span>
                {vehicle.capacity} L
              </p>
              <p className="text-base">
                <span className="font-bold">Description: </span>
                {vehicle.veh_desc}
              </p>

              <div className="card-actions justify-center mt-10">
                <div className="btn-group">
                  <button
                    className={`btn ${
                      selectedVehicle === vehicle.veh_id ? "btn-active" : ""
                    }`}
                    onClick={handleToggle(vehicle.veh_id)}
                  >
                    Select{selectedVehicle === vehicle.veh_id && "ed"}
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleUpdate(vehicle.veh_id)()}
                  >
                    Update
                  </button>
                  <button
                    className="btn"
                    onClick={handleDelete(vehicle.veh_id)}
                  >
                    Delete
                  </button>
                </div>
                <button
                  className={`btn ${
                    selectedVehicle === vehicle.veh_id ? "btn-active" : ""
                  }`}
                  onClick={handleToggle(vehicle.veh_id)}
                >
                  Select{selectedVehicle === vehicle.veh_id && "ed"}
                </button>
                <button
                  className="btn"
                  onClick={() => handleUpdate(vehicle.veh_id)()}
                >
                  Update
                </button>
                <button className="btn" onClick={handleDelete(vehicle.veh_id)}>
                  Delete
                </button>
                {updateVehicle === vehicle.veh_id && (
                  <VehicleModal
                    visible={vehicleVisible}
                    setVisible={setVehicleVisible}
                    type={"Update"}
                    veh_id={vehicle.veh_id}
                    veh_info={vehicle}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="">
      <div className="text-center text-3xl m-10">Your Garage</div>
      <div className="flex justify-center space-x-10">{content}</div>
    </div>
  );
};

export default Vehicles;
