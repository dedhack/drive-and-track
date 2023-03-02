import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createVehicle = async (data) => {
  // expected data format:
  // "veh_name": "toyota vios",
  // "capacity": "40",
  // "user_id": "679460b7-84f8-44be-bb1b-50d3a50c04cc",
  // "veh_desc": "red",
  // "make": "toyota",
  // "model": "vios",
  // "year": "2004",
  // "vin": "123",
  // "ins_pol": "456"

  try {
    const response = await axiosClient.put("vehicles/create", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
