import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logOut,
  selectRefreshToken,
  selectAccessToken,
} from "./authSlice";

export const apiSlice = createApi({
  reducerPath: "features",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/create",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginUserMutation, useCreateUserMutation } = apiSlice;
