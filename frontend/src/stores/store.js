import { setUpListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setUpListeners(store.dispatch);
