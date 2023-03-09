import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import FuelModal from "../components/modals/FuelModal";
import { getRefuels, deleteRefuel } from "../apis/refuelAPI";
import FuelCard from "../components/FuelCard";
import DoChart from "../components/charts/DoChart";
import FBarChart from "../components/charts/FBarChart";
import {
  averageCost,
  totalCost,
  totalFuelUsed,
  averageDistance,
  averageFuelEfficiency,
} from "../components/charts/calculations";

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
        // new fuel card
        <li key={index} className="mb-10 ml-4">
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
      <div className="mt-20 text-center"></div>
      <div className="flex max-h-screen ">
        {/* <div className="my-10 mx-20"> */}
        <div className="w-1/3 px-10 overflow-y-scroll">
          <ol className="relative border-l border-gray-400">
            {/* <FuelCard /> */}
            {content}
          </ol>
        </div>

        {/* NEXT 2/3 of the page */}
        <div className="w-2/3 bg-gray-100">
          <div className="flex flex-row gap-4 p-4 ">
            <div className="basis-1/3">
              {fuelLogs.length > 0 ? <DoChart /> : null}
            </div>
            {/* CARD STARTS HERE */}
            <div className="card basis-2/3">
              <div className="card bg-neutral text-primary-content">
                <div className="card-body">
                  <h2 className="card-title italic">Fuel Logs Summary</h2>
                  <p>Number of entries : {fuelLogs.length}</p>
                  {fuelLogs.length > 0 ? (
                    <>
                      <p>
                        Average Daily Cost for Fuel :
                        <span> ${averageCost(fuelLogs).toFixed(2)}</span>
                      </p>
                      <p>
                        Average Distance Traveled :
                        <span> {averageDistance(fuelLogs).toFixed(2)} km</span>
                      </p>
                      <p>
                        Total Volume of petrol :
                        <span> {totalFuelUsed(fuelLogs).toFixed(2)} L</span>
                      </p>
                      <p>
                        Total Spent on Fuel :
                        <span> ${totalCost(fuelLogs).toFixed(2)}</span>
                      </p>
                      <p>
                        Average fuel efficiency :
                        <span>
                          {" "}
                          {averageFuelEfficiency(fuelLogs).toFixed(2)} km/L
                        </span>
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            {/* CARD ENDS HERE */}
          </div>
          <div className="h-[500px]">
            {fuelLogs.length > 0 ? <FBarChart /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fuel;
