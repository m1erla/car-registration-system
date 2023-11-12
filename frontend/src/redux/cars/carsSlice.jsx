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

    builder.addCase(getAllCars.pending, commonPendingActions);
    builder.addCase(getAllCars.fulfilled, commonFulfilledActions);
    builder.addCase(getAllCars.rejected, commonRejectedActions);

    builder.addCase(getAllByModel.pending, commonPendingActions);
    builder.addCase(getAllByModel.fulfilled, commonFulfilledActions);
    builder.addCase(getAllByModel.rejected, commonRejectedActions);

    builder.addCase(getAllByBrand.pending, commonPendingActions);
    builder.addCase(getAllByBrand.fulfilled, commonFulfilledActions);
    builder.addCase(getAllByBrand.rejected, commonRejectedActions);

    builder.addCase(getAllByBrandAndModel.pending, commonPendingActions);
    builder.addCase(getAllByBrandAndModel.fulfilled, commonFulfilledActions);
    builder.addCase(getAllByBrandAndModel.rejected, commonRejectedActions);

    builder.addCase(getCarById.pending, commonPendingActions);
    builder.addCase(getCarById.fulfilled, (state, action) => {
      state.carsId = action.payload;
      state.carsStatus = "success";
    });
    builder.addCase(getCarById.rejected, commonRejectedActions);

    builder.addCase(getCarByUserId.pending, commonPendingActions);
    builder.addCase(getCarByUserId.fulfilled, (state, action) => {
      state.carsByUserId = action.payload;
      state.carsByUserIdStatus = "success";
    });
    builder.addCase(getCarByUserId.rejected, commonRejectedActions);

    builder.addCase(updateCar.pending, commonPendingActions);
    builder.addCase(updateCar.fulfilled, (state, action) => {
      const { id, carName, brand, model, year, plate } = action.payload;
      const index = state.carsByUserId.findIndex((car) => car.id === id);
      state.carsByUserId[index] = { id, carName, brand, model, year, plate };
      state.carsByUserIdStatus = "success";
    });
    builder.addCase(updateCar.rejected, commonRejectedActions);

    builder.addCase(deleteCar.pending, commonPendingActions);
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      const id = action.payload;
      state.carsByUserId = state.carsByUserId.filter((car) => car.id !== id);
      state.carsStatus = "success";
    });
    builder.addCase(deleteCar.rejected, commonRejectedActions);

    builder.addCase(addCar.pending, commonPendingActions);
    builder.addCase(addCar.fulfilled, (state, action) => {
      state.allCars.push(action.payload);
      state.carsStatus = "success";
    });
    builder.addCase(addCar.rejected, commonRejectedActions);
  },
});

export const { filteredData } = carsSlice.actions;

export default carsSlice.reducer;
