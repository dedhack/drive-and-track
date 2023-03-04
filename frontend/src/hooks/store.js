import { create } from "zustand";
import produce from "immer";
import { immer } from "zustand/middleware/immer";

export const useUser = create((set) => ({
  accessToken: null,
  auth: false,
  email: null,
  user_id: null,
  is_admin: null,
  setAccessToken: (newToken) => set({ accessToken: newToken, auth: true }),
  setEmail: (newEmail) => set({ email: newEmail }),
  setUserId: (newId) => set({ user_id: newId }),
  setIsAdmin: (newAdmin) => set({ is_admin: newAdmin }),
}));

export const useVehicles = create(
  immer((set) => ({
    vehicles: [],
    setVehicles: (newVehicles) =>
      set((state) => {
        state.vehicles = newVehicles;
      }),
  }))
);
