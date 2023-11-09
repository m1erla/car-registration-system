import { createSlice } from "@reduxjs/toolkit";
import {
  addCar,
  deleteCar,
  getAllByBrand,
  getAllByBrandAndModel,
  getAllByModel,
  getAllCars,
  getCarById,
  getCarByUserId,
  updateCar,
} from "../../api";

const initialState = {
  allCars: [],
  carsStatus: "idle",
  carsError: null,

  filterCars: [],
  filterCarsStatus: "idle",
  filterCarsError: null,

  carsId: null,
  carsIdStatus: "idle",
  carsIdError: null,

  carsByUserId: [],
  carsByUserIdStatus: "idle",
  carsByUserIdError: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    filteredData: (state, action) => {
      const data = action.payload;
      state.allCars =
        data !== ""
          ? state.filterCars.filter((car) => car.carName.includes(data))
          : state.filterCars;
    },
  },
  extraReducers: (builder) => {
    const commonPendingActions = (state, action) => {
      state.carsStatus = "loading";
    };

    const commonFulfilledActions = (state, action) => {
      state.allCars = action.payload;
      state.filterCars = action.payload;
      state.carsStatus = "success";
    };

    const commonRejectedActions = (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    };

    builder
      .addCase(getAllCars.pending, commonPendingActions)
      .addCase(getAllCars.fulfilled, commonFulfilledActions)
      .addCase(getAllCars.rejected, commonRejectedActions)

      .addCase(getAllByModel.pending, commonPendingActions)
      .addCase(getAllByModel.fulfilled, commonFulfilledActions)
      .addCase(getAllByModel.rejected, commonRejectedActions)

      .addCase(getAllByBrand.pending, commonPendingActions)
      .addCase(getAllByBrand.fulfilled, commonFulfilledActions)
      .addCase(getAllByBrand.rejected, commonRejectedActions)

      .addCase(getAllByBrandAndModel.pending, commonPendingActions)
      .addCase(getAllByBrandAndModel.fulfilled, commonFulfilledActions)
      .addCase(getAllByBrandAndModel.rejected, commonRejectedActions)

      .addCase(getCarById.pending, commonPendingActions)
      .addCase(getCarById.fulfilled, (state, action) => {
        state.carsId = action.payload;
        state.carsStatus = "success";
      })
      .addCase(getCarById.rejected, commonRejectedActions)

      .addCase(getCarByUserId.pending, commonPendingActions)
      .addCase(getCarByUserId.fulfilled, (state, action) => {
        state.carsByUserId = action.payload;
        state.carsByUserIdStatus = "success";
      })
      .addCase(getCarByUserId.rejected, commonRejectedActions)

      .addCase(updateCar.pending, commonPendingActions)
      .addCase(updateCar.fulfilled, (state, action) => {
        const { id, carName, brand, model, year, plate } = action.payload;
        const index = state.carsByUserId.findIndex((car) => car.id === id);
        state.carsByUserId[index] = { id, carName, brand, model, year, plate };
        state.carsByUserIdStatus = "success";
      })
      .addCase(updateCar.rejected, commonRejectedActions)

      .addCase(deleteCar.pending, commonPendingActions)
      .addCase(deleteCar.fulfilled, (state, action) => {
        const id = action.payload;
        state.carsByUserId = state.carsByUserId.filter((car) => car.id !== id);
        state.carsStatus = "success";
      })
      .addCase(deleteCar.rejected, commonRejectedActions)

      .addCase(addCar.pending, commonPendingActions)
      .addCase(addCar.fulfilled, (state, action) => {
        state.allCars.push(action.payload);
        state.carsStatus = "success";
      })
      .addCase(addCar.rejected, commonRejectedActions);
  },
});

export const { filteredData } = carsSlice.actions;

export default carsSlice.reducer;
