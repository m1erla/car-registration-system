import { createSlice } from "@reduxjs/toolkit";
import { changePassword, axiosRegister, loginAuth } from "../../api";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    registerUser: null,
    registerStatus: "idle",
    registerError: null,

    loginUser: null,
    loginStatus: "idle",
    loginError: null,
  },

  changePasswordMessage: null,
  changePasswordStatus: "idle",
  changePasswordError: null,

  extraReducers: {
    [axiosRegister.pending]: (state, action) => {
      state.registerStatus = "loading";
    },
    [axiosRegister.fulfilled]: (state, action) => {
      state.registerUser = action.payload;
      state.registerStatus = "success";
    },
    [axiosRegister.rejected]: (state, action) => {
      state.registerStatus = "failed";
      state.registerError = action.error.message;
    },

    [loginAuth.pending]: (state, action) => {
      state.loginStatus = "loading";
    },
    [loginAuth.fulfilled]: (state, action) => {
      state.loginUser = action.payload;
      state.loginStatus = "success";
    },
    [loginAuth.rejected]: (state, action) => {
      state.loginStatus = "failed";
      state.loginError = action.error.message;
    },

    [changePassword.pending]: (state, action) => {
      state.changePasswordStatus = "loading";
    },
    [changePassword.fulfilled]: (state, action) => {
      state.changePasswordMessage = action.payload;
      state.changePasswordStatus = "success";
    },
    [changePassword.rejected]: (state, action) => {
      state.changePasswordStatus = "failed";
      state.changePasswordError = action.error.message;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
