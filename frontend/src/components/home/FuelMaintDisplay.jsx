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
      <tr>
        <th>{maint.datetime}</th>
        <th>{maint.odometer} km</th>
        <th>${maint.price}</th>
      </tr>
    ));
  }

  return (
    <div>
      {/* <h1>Fuel</h1> */}
      {/* {refuelContent} */}
      {/* <h1>Maintenance</h1> */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Odometer</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelMaintDisplay;
