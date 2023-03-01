import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

export const registerUser = async (data) => {
  try {
    const response = await axiosClient.put("users/create", data);
    return [response.data, null];
  } catch (error) {
    // console.log("error: ", error);
    return [null, error];
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosClient.post("users/login", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
