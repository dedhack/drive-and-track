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
    return <p>Loading...</p>;
  } else if (maintIsError) {
    return <p>Error</p>;
  } else if (maintData) {
    content = maintData.map((maint) => (
      <tr>
        <td>{maint.datetime}</td>
        <td>{maint.odometer} km</td>
        <td>${maint.price}</td>
      </tr>
    ));
    return (
      <div className="text-center">
        <p>Maintenance</p>
        <table className="table">
          <thead className="">
            <tr className="">
              <th className="bg-gray-800">Date</th>
              <th className="bg-gray-800">Odometer</th>
              <th className="bg-gray-800">Price</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
};

export default MaintDisplay;
