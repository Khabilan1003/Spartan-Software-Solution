import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return axios
    .get("http://localhost:5000/auth/login/local/success", {
      withCredentials: true,
    })
    .then((response) => response.data);
});

export const logoutUser = createAsyncThunk("user/logout", () => {
  return axios
    .get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    })
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isLoggedIn: false,
    error: "",
  },
  extraReducers: (builder) => {
    // Fetch User
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.isSuccess == true) {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isLoggedIn = false;
    });

    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.isLoggedOut) {
        state.user = {};
        state.isLoggedIn = false;
      }
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
