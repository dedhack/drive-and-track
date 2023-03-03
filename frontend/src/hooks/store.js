import { create } from "zustand";
import produce from "immer";
import { immer } from "zustand/middleware/immer";

// export const useUser = create((set) => ({
//   accessToken: null,
//   setAccessToken: (newToken) =>
//     set(
//       produce((state) => {
//         accessToken: state.
//       })
//     ),
//   unsetAccessToken: () =>
//     set((state) => {
//       state.accessToken = null;
//     }),
// }));
// export const useUser = create(
//   immer((set) => ({
//     accessToken: "",
//     setAccessToken: (newToken) => {
//       set((state) => {
//         state.accessToken = newToken;
//       });
//     },
//   }))
// );

export const useUser = create((set) => ({
  accessToken: null,
  auth: false,
  setAccessToken: (newToken) => set({ accessToken: newToken, auth: true }),
}));
