import axios from "axios";
import { axiosClient } from "./usersAPI";

export const createRefuel = async (data) => {};

// refuel takes in a veh_id
export const getRefuels = async (refuel) => {
  const response = await axiosClient.get("refuels/allrefuels", refuel);
  return response.data;
};

export const deleteRefuel = async (data) => {};

export const updateRefuel = async (data) => {};
