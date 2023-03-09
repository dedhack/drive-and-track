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
    // TODO: fetch all fuel logs, maint logs, service types for the vehicle

    // get fuel logs

    // get maint logs

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
      setVehName(null); // TODO: check whether this is being used
    }
  };

  let content = null;
  if (vehicles) {
    content = vehicles.map((vehicle, index) => {
      return (
        <div key={index}>
          <div className="w-96">
            <VehicleCard vehicle={vehicle} />
            <div className="card-actions justify-center  m-10">
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
    <div className="mt-24">
      <div className="text-center text-3xl m-10">Your Garage</div>
      <div className="flex justify-center space-x-10">{content}</div>
    </div>
  );
};

export default Vehicles;
