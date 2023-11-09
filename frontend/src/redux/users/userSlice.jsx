import { createSlice } from "@reduxjs/toolkit";
import { axiosRegister, loginAuth, changePassword } from "../../api";

const initialState = {
  registerUser: null,
  registerStatus: "idle",
  registerError: null,

  loginUser: null,
  loginStatus: "idle",
  loginError: null,

  changePasswordMessage: null,
  changePasswordStatus: "idle",
  changePasswordError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(axiosRegister.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(axiosRegister.fulfilled, (state, action) => {
        state.registerUser = action.payload;
        state.registerStatus = "success";
      })
      .addCase(axiosRegister.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.error.message;
      })
      .addCase(loginAuth.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loginUser = action.payload;
        state.loginStatus = "success";
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordMessage = action.payload;
        state.changePasswordStatus = "success";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = "failed";
        state.changePasswordError = action.error.message;
      });
  },
});

export default userSlice.reducer;
