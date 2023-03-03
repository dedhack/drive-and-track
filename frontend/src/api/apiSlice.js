import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// create a template apiSlice that will be used for the other slices
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  tagTypes: ["User", "Auth", "Vehicle", "Refuel", "Maintenance"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
  }),
});
