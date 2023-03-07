import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5001/",
});

// create user
export const registerUser = async (data) => {
  try {
    const response = await axiosClient.put("users/create", data);
    return [response.data, null];
  } catch (error) {
    // console.log("error: ", error);
    return [null, error];
  }
};

// login user
export const loginUser = async (data) => {
  try {
    const response = await axiosClient.post("users/login", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// refresh token
export const refreshToken = async (data) => {
  try {
    const response = await axiosClient.post("users/refresh", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// update user password
export const updatePassword = async (data) => {};

// delete user
export const deleteUser = async (data) => {};

// get all users (admin only)
export const getAllUsers = async (data) => {
  try {
    const response = await axiosClient.get("users", data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
