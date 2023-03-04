import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createVehicle = async (data) => {
  try {
    const response = await axiosClient.put("vehicles/create", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// TODO: below are generics HTTP requests that needs to be edited

// get vehicles belonging to user. Require "user_id" as data to be passed
export const getVehicles = async (data) => {
  // try {
  //   const response = await axiosClient.get("vehicles/allvehicles", data);
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }

  const response = await axiosClient.get("vehicles/allvehicles", data);
  return response.data;
};

// for specific vehicle log
export const getVehicleLog = async (data) => {};

// Update vehicle log by id
export const updateVehicleLog = async (data) => {};

// Delete vehicle log by id
export const deleteVehicleLog = async (data) => {};
