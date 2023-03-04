import React from "react";
import { useQuery } from "react-query";
import { getRefuels } from "../../apis/refuelAPI";
import useAuth from "../../hooks/useAuth";

const FuelMaintDisplay = () => {
  // const { user_id } = useAuth();

  //FIXME: hard coded veh_id
  const veh_id = { veh_id: "dc792216-bf37-4c5a-857e-0add90a87087" };

  // fetch veh refuels
  const {
    data: refuelsData,
    isLoading,
    isError,
  } = useQuery(["refuels"], () => getRefuels(veh_id));

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error</p>;
  } else if (refuelsData) {
    content = refuelsData.map((refuel) => (
      <div key={refuel.refuel_id}>
        <p>refuel date: {refuel.date}</p>
        <p>refuel odometer: {refuel.odometer}</p>
        <p>refuel price: {refuel.price}</p>
      </div>
    ));
  }

  // fetch veh maintenance
  return (
    <div>
      FuelMaintDisp
      {content}
    </div>
  );
};

export default FuelMaintDisplay;
