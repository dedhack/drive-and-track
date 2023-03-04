import { axiosClient } from "./usersAPI";

export const createService = async (newData) => {
  const response = await axiosClient.put("services/create", newData);
  return response.data;
};

export const getServices = async (veh_id) => {
  const response = await axiosClient.post("services/allservices", veh_id);
  return response.data;
};

export const deleteService = async (service_id) => {
  const response = await axiosClient.delete("services/delete", service_id);
  return response.data;
};

export const updateService = async (newData) => {
  const response = await axiosClient.patch("services/update", newData);
  return response.data;
};
