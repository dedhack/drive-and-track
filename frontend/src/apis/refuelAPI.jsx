import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createRefuel = async (newData) => {
  try {
    const response = await axiosClient.put("refuels/create", newData);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// refuel takes in a veh_id
export const getRefuels = async (veh_id) => {
  try {
    const response = await axiosClient.post("refuels/allrefuels", veh_id);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteRefuel = async (refuel_id) => {
  const response = await axiosClient.delete("refuels/delete", refuel_id);
  return response.data;
};

export const updateRefuel = async (newData) => {
  const response = await axiosClient.patch("refuels/update", newData);
  return response.data;
};
