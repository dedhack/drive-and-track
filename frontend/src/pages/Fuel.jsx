import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import FuelModal from "../components/modals/FuelModal";
import { getRefuels, deleteRefuel } from "../apis/refuelAPI";

const Fuel = () => {
  const { user_id, selectedVehicle, fuelLogs, setFuelLogs } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // const [fuel, setFuel] = useState([]);
  const [fuelVisible, setFuelVisible] = useState(false);
  const [updateRefuel, setUpdateRefuel] = useState(null);

  const fetchFuel = async () => {
    console.log("selectedVehicle: ", selectedVehicle);
    const [data, error] = await getRefuels({ veh_id: selectedVehicle });
    console.log("data: ", data); // data returned is an object for 1 entry
    if (data) {
      setFuelLogs(data);
    } else if (data?.message) {
      console.log("message: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFuel();
    console.log(fuelLogs);
  }, []);

  const handleDelete = async (refuel_id) => {
    const [data, error] = await deleteRefuel({ refuel_id: refuel_id });
    if (data) {
      console.log("refuel deleted data: ", data);
    }
    // fetch the refuels again
    fetchFuel();
  };

  const handleUpdate = (refuel_id) => async () => {
    setUpdateRefuel(refuel_id);
    setFuelVisible(true);
  };

  let content = null;
  if (Array.isArray(fuelLogs) && fuelLogs.length > 0) {
    content = fuelLogs.map((fuel, index) => {
      return (
        <div
          key={index}
          className="flex flex-row mt-4 bg-slate-100 justify-around w-full"
        >
          <div className="p-4 text-center">date: {fuel.datetime}</div>
          <div className="p-4 text-center">odometer: {fuel.odometer} km</div>
          <div className="p-4 text-center">price: ${fuel.price}</div>
          <div className="p-4 text-center">Litres: {fuel.fuel_amount}L</div>
          <div>
            <button
              className="btn"
              onClick={() => handleUpdate(fuel.refuel_id)()}
            >
              Update
            </button>
            {updateRefuel === fuel.refuel_id && (
              <FuelModal
                visible={fuelVisible}
                setVisible={setFuelVisible}
                type={"Update"}
                refuel_id={fuel.refuel_id}
                refuel_info={fuel}
              />
            )}
            <button
              className="btn"
              onClick={() => handleDelete(fuel.refuel_id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  } else {
    content = <div>no fuel</div>;
  }

  return (
    <div>
      FUEL
      {content}
    </div>
  );
};

export default Fuel;
