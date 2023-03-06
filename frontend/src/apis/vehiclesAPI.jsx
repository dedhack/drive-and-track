import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createVehicle = async (data, access) => {
  try {
    const response = await axiosClient.put("vehicles/create", data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// TODO: below are generics HTTP requests that needs to be edited

export const getVehicles = async (data, access) => {
  try {
    const response = await axiosClient.post("vehicles/allvehicles", data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: data,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// for specific vehicle log
export const getVehicleLog = async (data, access) => {};

// Update vehicle log by id
export const updateVehicleLog = async (data, access) => {
  // payload needs veh_id, and user_id (from global state)
  try {
    const response = await axiosClient.patch("vehicles/update", data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// Delete vehicle log by id
export const deleteVehicleLog = async (data, access) => {
  try {
    const response = await axiosClient.delete("vehicles/delete", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: data,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
