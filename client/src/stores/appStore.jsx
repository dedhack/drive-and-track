import { create } from "zustand";

const useAppStore = create((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
}));
