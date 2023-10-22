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

export const carsSlice = createSlice({
  name: "cars",
  initialState: {
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
  },
  reducers: {
    filteredData: (state, action) => {
      const data = action.payload;

      if (data !== "") {
        const newFilteredData = state.filterCars.filter((car) =>
          car.carName.includes(data)
        );
        state.allCars = newFilteredData;
      } else {
        state.allCars = state.filterCars;
      }
    },
  },
  extraReducers: {
    [getAllCars.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [getAllCars.fulfilled]: (state, action) => {
      state.allCars = action.payload;
      state.filterCars = action.payload;
      state.carsStatus = "success";
    },
    [getAllCars.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    [getAllByModel.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [getAllByModel.fulfilled]: (state, action) => {
      state.allCars = action.payload;
      state.filterCars = action.payload;
      state.carsStatus = "success";
    },
    [getAllByModel.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    [getAllByBrand.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [getAllByBrand.fulfilled]: (state, action) => {
      state.allCars = action.payload;
      state.filterCars = action.payload;
      state.carsStatus = "success";
    },
    [getAllByBrand.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    // get by brand and modal

    [getAllByBrandAndModel.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [getAllByBrandAndModel.fulfilled]: (state, action) => {
      state.allCars = action.payload;
      state.filterCars = action.payload;
      state.carsStatus = "success";
    },
    [getAllByBrandAndModel.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    //get byCarId car
    [getCarById.pending]: (state, action) => {
      state.carsIdStatus = "loading";
    },
    [getCarById.fulfilled]: (state, action) => {
      state.carsId = action.payload;
      state.carsStatus = "success";
    },
    [getCarById.rejected]: (state, action) => {
      state.carsIdStatus = "failed";
      state.carsIdError = action.error.message;
    },

    //get byUserId cars
    [getCarByUserId.pending]: (state, action) => {
      state.carsByUserIdStatus = "loading";
    },
    [getCarByUserId.fulfilled]: (state, action) => {
      state.carsByUserId = action.payload;
      state.carsByUserIdStatus = "success";
    },
    [getCarByUserId.rejected]: (state, action) => {
      state.carsByUserIdStatus = "failed";
      state.carsByUserIdError = action.error.message;
    },
    //update car
    [updateCar.pending]: (state, action) => {
      state.carsByUserIdStatus = "loading";
    },
    [updateCar.fulfilled]: (state, action) => {
      const { id, carName, brand, model, modelYear, licensePlate } =
        action.payload;
      const index = state.carsByUserId.findIndex((car) => car.id === id);
      state.carsByUserId[index].carName = carName;
      state.carsByUserId[index].brand = brand;
      state.carsByUserId[index].model = model;
      state.carsByUserId[index].modelYear = modelYear;
      state.carsByUserId[index].licensePlate = licensePlate;
      state.carsByUserIdStatus = "success";
    },
    [updateCar.rejected]: (state, action) => {
      state.carsByUserIdStatus = "failed";
      state.carsByUserIdError = action.error.message;
    },

    //Deleted car

    [deleteCar.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [deleteCar.fulfilled]: (state, action) => {
      const id = action.payload;
      const newCars = state.carsByUserId.filter((car) => car.id !== id);
      state.carsByUserId = newCars;
      state.carsStatus = "success";
    },
    [deleteCar.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    //add cars
    [addCar.pending]: (state, action) => {
      state.carsStatus = "loading";
    },
    [addCar.fulfilled]: (state, action) => {
      state.allCars.push(action.payload);
      state.carsStatus = "success";
    },
    [addCar.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },

    //delete cars
    [deleteCar.pending]: (state) => {
      state.carsStatus = "loading";
    },
    [deleteCar.fulfilled]: (state, action) => {
      const id = action.payload;
      const newCar = state.allCars.filter((car) => car.id !== id);
      state.allCars = newCar;
      state.carsStatus = "success";
    },
    [deleteCar.rejected]: (state, action) => {
      state.carsStatus = "failed";
      state.carsError = action.error.message;
    },
  },
});

export const { filteredData } = carsSlice.actions;

export default carsSlice.reducer;
