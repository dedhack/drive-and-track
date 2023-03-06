import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createRefuel = async (newData, access) => {
  try {
    const response = await axiosClient.put("refuels/create", newData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// refuel takes in a veh_id
export const getRefuels = async (veh_id, access) => {
  try {
    console.log("veh_id", veh_id);
    console.log("access", access);
    const response = await axiosClient.post("refuels/allrefuels", veh_id, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
//
export const deleteRefuel = async (refuel_id, access) => {
  try {
    const response = await axiosClient.delete("refuels/delete", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: refuel_id,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateRefuel = async (newData, access) => {
  try {
    const response = await axiosClient.patch("refuels/update", newData);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
