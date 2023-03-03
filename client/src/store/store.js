import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authReducer from "../features/authSlice";
import { testSlice } from "../features/testSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [testSlice.reducerPath]: testSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware, testSlice.middleware]),
  devTools: true,
});
