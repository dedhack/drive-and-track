import React from "react";
import { getServices } from "../../apis/servicesAPI";
import { useQuery } from "react-query";

const MaintDisplay = () => {
  // FIXME: hardcoded veh_id
  const veh_id = { veh_id: "dc792216-bf37-4c5a-857e-0add90a87087" };

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
    // <div className="overflow-x-auto">
    <div className="">
      <table className="table-auto">
        <thead className="">
          <tr>
            <th>Date</th>
            <th>Odometer</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default MaintDisplay;
