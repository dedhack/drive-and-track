import React from "react";
import { useQuery } from "react-query";
import { getRefuels } from "../../apis/refuelAPI";
import useAuth from "../../hooks/useAuth";
import { getServices } from "../../apis/servicesAPI";

const FuelMaintDisplay = () => {
  // const { user_id } = useAuth();

  //FIXME: hard coded veh_id
  const veh_id = { veh_id: "dc792216-bf37-4c5a-857e-0add90a87087" };

  // fetch veh refuels
  const {
    data: refuelsData,
    isLoading: refuelsIsLoading,
    isError: refuelsIsError,
  } = useQuery(["refuels"], () => getRefuels(veh_id));

  let refuelContent = null;
  if (refuelsIsLoading) {
    refuelContent = <p>Loading...</p>;
  } else if (refuelsIsError) {
    refuelContent = <p>Error</p>;
  } else if (refuelsData) {
    refuelContent = refuelsData.map((refuel) => (
      <div key={refuel.refuel_id}>
        <p>refuel date: {refuel.datetime}</p>
        <p>refuel odometer: {refuel.odometer}</p>
        <p>refuel price: {refuel.price}</p>
      </div>
    ));
  }

  // fetch veh maintenance
  const {
    data: maintData,
    isLoading: maintIsLoading,
    isError: maintIsError,
  } = useQuery(["maint"], () => getServices(veh_id));

  let content = null;
  if (maintIsLoading) {
    content = <p>Loading...</p>;
  } else if (maintIsError) {
    content = <p>Error</p>;
  } else if (maintData) {
    content = maintData.map((maint) => (
      <div key={maint.maint_id}>
        <p>maintenance date: {maint.datetime}</p>
        <p>maintenance odometer: {maint.odometer}</p>
        <p>maintenance price: {maint.price}</p>
      </div>
    ));
  }

  return (
    <div>
      <h1>Fuel</h1>
      {refuelContent}
      <h1>Maintenance</h1>
      {content}
    </div>
  );
};

export default FuelMaintDisplay;
