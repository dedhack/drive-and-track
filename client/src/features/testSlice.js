import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testSlice = createApi({
  reducerPath: "features",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  tagTypes: ["UserTest"],
  endpoints: (builder) => ({
    // get the test route
    getTest: builder.query({
      query: () => "/test",
      providesTags: ["UserTest"],
    }),
    loginUser: builder.mutation({
      query: () => ({
        url: "/users/login",
        method: "POST",
        body: {
          username: "test",
          password: "test",
        },
      }),
      providesTags: ["UserTest"],
    }),
  }),
});

export const { useGetTestQuery, useLoginUserMutation } = testSlice;
