import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001",
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState());
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // pending to read up more on the refresh token

  // if error with access token, try to get new access token with refresh token
  if (result.error) {
    const refreshToken = selectRefreshToken(getState());

    // if refresh token exists, try to get new access token
    if (refreshToken) {
      //   const response = await fetch("http://localhost:5001/users/refresh", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ refresh: refreshToken }),
      //   });
      //   const data = await response.json();

      // try to do RTK query style

      const refreshResult = await baseQuery(
        "/users/refresh",
        api,
        extraOptions
      );
      console.log(refreshResult);

      // if new access token is returned, set new access token and try again
      if (data.access) {
        dispatch(setCredentials(data));
        return baseQuery(args, api, extraOptions);
      }
    }
    // if no refresh token, log out
    dispatch(logOut());
  }
  // if no error, return result

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
