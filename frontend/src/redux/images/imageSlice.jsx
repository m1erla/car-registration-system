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
    builder.addCase(axiosGetImage.pending, (state) => {
      state.imageIdStatus = "loading";
    });
    builder.addCase(axiosGetImage.fulfilled, (state, action) => {
      state.imageId = action.payload;
      state.imageIdStatus = "success";
    });
    builder.addCase(axiosGetImage.rejected, (state, action) => {
      state.imageIdStatus = "failed";
      state.imageIdError = action.error.message;
    });
    builder.addCase(addImage.pending, (state) => {
      state.imageIdStatus = "loading";
    });
    builder.addCase(addImage.fulfilled, (state, action) => {
      state.imageId.push(action.payload);
      state.imageIdStatus = "success";
    });
    builder.addCase(addImage.rejected, (state, action) => {
      state.imageIdStatus = "failed";
      state.imageIdError = action.error.message;
    });
  },
});

export default imageSlice.reducer;
