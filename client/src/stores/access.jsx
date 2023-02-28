import { create } from "zustand";

const accessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
}));
