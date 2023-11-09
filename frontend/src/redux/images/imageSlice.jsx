import { createSlice } from "@reduxjs/toolkit";
import { addImage, axiosGetImage } from "../../api";

const initialState = {
  imageId: [],
  imageIdStatus: "idle",
  imageIdError: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {}, // Add any additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(axiosGetImage.pending, (state) => {
        state.imageIdStatus = "loading";
      })
      .addCase(axiosGetImage.fulfilled, (state, action) => {
        state.imageId = action.payload;
        state.imageIdStatus = "success";
      })
      .addCase(axiosGetImage.rejected, (state, action) => {
        state.imageIdStatus = "failed";
        state.imageIdError = action.error.message;
      })
      .addCase(addImage.pending, (state) => {
        state.imageIdStatus = "loading";
      })
      .addCase(addImage.fulfilled, (state, action) => {
        state.imageId.push(action.payload);
        state.imageIdStatus = "success";
      })
      .addCase(addImage.rejected, (state, action) => {
        state.imageIdStatus = "failed";
        state.imageIdError = action.error.message;
      });
  },
});

export default imageSlice.reducer;
