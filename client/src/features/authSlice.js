import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { access: null, refresh: null, username: null },
  reducers: {
    setCredentials(state, action) {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
    },
    logOut: (state, action) => {
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectAccessToken = (state) => state.auth.access;
export const selectRefreshToken = (state) => state.auth.refresh;
