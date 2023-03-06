import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createService = async (newData) => {
  try {
    const response = await axiosClient.put("services/create", newData);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getServices = async (veh_id) => {
  try {
    const response = await axiosClient.post("services/allservices", veh_id);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteService = async (service_id) => {
  try {
    const response = await axiosClient.delete("services/delete", {
      data: service_id,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateService = async (newData) => {
  try {
    const response = await axiosClient.patch("services/update", newData);

    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
