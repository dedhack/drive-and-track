import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const createService = async (newData, access) => {
  try {
    const response = await axiosClient.put("services/create", newData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getServices = async (veh_id, access) => {
  try {
    const response = await axiosClient.post("services/allservices", veh_id, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteService = async (service_id, access) => {
  try {
    const response = await axiosClient.delete("services/delete", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: service_id,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateService = async (newData, access) => {
  try {
    const response = await axiosClient.patch("services/update", newData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// don't need auth
export const getServiceTypes = async () => {
  try {
    const response = await axiosClient.get("services/types");
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
