import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import FuelModal from "../components/modals/FuelModal";
import { getRefuels } from "../apis/refuelAPI";

const Fuel = () => {
  const { user_id, selectedVehicle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fuel, setFuel] = useState([]);

  const fetchFuel = async () => {
    console.log("selectedVehicle: ", selectedVehicle);
    const [data, error] = await getRefuels({ veh_id: selectedVehicle });
    console.log("data: ", data); // data returned is an object for 1 entry
    if (data) {
      setFuel(data);
    } else if (data?.message) {
      console.log("message: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFuel();
    console.log(fuel);
  }, []);

  let content = null;
  if (Array.isArray(fuel) && fuel.length > 0) {
    content = fuel.map((fuel, index) => {
      return (
        <>
          <div
            key={index}
            className="flex flex-row m-4 bg-slate-100 justify-around w-full"
          >
            <div className=" p-4 text-center">date: {fuel.datetime}</div>
            <div className="p-4 text-center">odometer: {fuel.odometer}</div>
            <div className="p-4 text-center">price: {fuel.price}</div>
            <div className="p-4 text-center">total: {fuel.fuel_amount}</div>
          </div>
        </>
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
