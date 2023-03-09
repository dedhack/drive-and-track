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
// expect you to pass the refresh token in the body
export const refreshToken = async (refresh) => {
  try {
    const response = await axiosClient.post("users/refresh", refresh);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// update user password
export const updatePassword = async (data, access) => {};

// delete user
export const deleteUser = async (user_id, access) => {
  try {
    const response = await axiosClient.delete("users/delete", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: user_id,
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

// get all users (admin only)
export const getAllUsers = async (auth) => {
  try {
    const response = await axiosClient.get("users/allusers", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
