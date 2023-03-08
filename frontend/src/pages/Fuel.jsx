import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import FuelModal from "../components/modals/FuelModal";
import { getRefuels, deleteRefuel } from "../apis/refuelAPI";
import FuelCard from "../components/FuelCard";

const Fuel = () => {
  const { auth, selectedVehicle, fuelLogs, setFuelLogs } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [fuelVisible, setFuelVisible] = useState(false);
  const [updateRefuel, setUpdateRefuel] = useState(null);

  const fetchFuel = async () => {
    console.log("selectedVehicle: ", selectedVehicle);
    const [data, error] = await getRefuels({ veh_id: selectedVehicle }, auth);
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
    const [data, error] = await deleteRefuel({ refuel_id: refuel_id }, auth);
    if (data) {
      console.log("refuel deleted data: ", data);
    }
    if (error) {
      console.log("refuel deleted error: ", error);
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
      // convert to readable datetime
      const conDate = new Date(fuel.datetime).toLocaleString();
      return (
        // <div
        //   key={index}
        //   className="flex flex-row mt-4 bg-slate-100 justify-around w-full"
        // >
        //   <div className="p-4 text-center">date: {fuel.datetime}</div>
        //   <div className="p-4 text-center">odometer: {fuel.odometer} km</div>
        //   <div className="p-4 text-center">price: ${fuel.price}</div>
        //   <div className="p-4 text-center">Litres: {fuel.fuel_amount}L</div>
        //   <div>
        //     <button
        //       className="btn"
        //       onClick={() => handleUpdate(fuel.refuel_id)()}
        //     >
        //       Update
        //     </button>
        //     {updateRefuel === fuel.refuel_id && (
        //       <FuelModal
        //         visible={fuelVisible}
        //         setVisible={setFuelVisible}
        //         type={"Update"}
        //         refuel_id={fuel.refuel_id}
        //         refuel_info={fuel}
        //       />
        //     )}
        //     <button
        //       className="btn"
        //       onClick={() => handleDelete(fuel.refuel_id)}
        //     >
        //       Delete
        //     </button>
        //   </div>
        // </div>
        // new fuel card
        <li className="mb-10 ml-4">
          <FuelCard fuel={fuel} conDate={conDate} />
          <button
            className="btn btn-sm m-1"
            onClick={() => handleUpdate(fuel.refuel_id)()}
          >
            Update
          </button>
          <button
            className="btn btn-sm m-1"
            onClick={() => handleDelete(fuel.refuel_id)}
          >
            Delete
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
        </li>
      );
    });
  } else {
    content = <div>No Fuel Records. Have you selected a vehicle?</div>;
  }

  return (
    <>
      <div className="mt-24 text-center">FUEL LOG</div>
      <div className=" flex">
        {/* <div className="my-10 mx-20"> */}
        <div className="w-1/3 px-10">
          <ol className="relative border-l border-gray-400 ">
            {/* <FuelCard /> */}
            {content}
          </ol>
        </div>
        <div className="w-2/3">NEXT 2 THIRDS</div>
      </div>
    </>
  );
};

export default Fuel;
