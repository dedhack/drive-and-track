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

export const getVehicles = async (data) => {
  try {
    const response = await axiosClient.post("vehicles/allvehicles", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// for specific vehicle log
export const getVehicleLog = async (data) => {};

// Update vehicle log by id
export const updateVehicleLog = async (data) => {
  // expected data format:
  //   {
  //     "veh_id" : "dc792216-bf37-4c5a-857e-0add90a87087",
  //     "veh_name": "toyota vios 2",
  //     "capacity": "40",
  //     "user_id": "679460b7-84f8-44be-bb1b-50d3a50c04cc",
  //     "veh_desc": "blue",
  //     "make": "toyota",
  //     "model": "vios",
  //     "year": "2010",
  //     "vin": "123",
  //     "ins_pol": "456"
  // }

  try {
    const response = await axiosClient.patch("vehicles/update", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// Delete vehicle log by id
export const deleteVehicleLog = async (data) => {
  try {
    const response = await axiosClient.delete("vehicles/delete", {
      data: data,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
