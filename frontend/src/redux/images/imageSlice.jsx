import { createSlice } from "@reduxjs/toolkit";
import { addImage, axiosGetImage } from "../../api";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    //getImageByCarId
    imageId: [],
    imageIdStatus: "idle",
    imageIdError: null,
  },

  extraReducers: {
    //get image by car id
    [axiosGetImage.pending]: (state, action) => {
      state.imageIdStatus = "loading";
    },
    [axiosGetImage.fulfilled]: (state, action) => {
      state.imageId = action.payload;
      state.imageIdStatus = "success";
    },
    [axiosGetImage.rejected]: (state, action) => {
      state.imageIdStatus = "failed";
      state.imageIdError = action.error.message;
    },

    //add one image
    [addImage.pending]: (state, action) => {
      state.imageIdStatus = "loading";
    },
    [addImage.fulfilled]: (state, action) => {
      state.imageId.push(action.payload);
      state.imageIdStatus = "success";
    },
    [addImage.rejected]: (state, action) => {
      state.imageIdStatus = "failed";
      state.imageIdError = action.error.message;
    },
  },
});

export default imageSlice.reducer;
