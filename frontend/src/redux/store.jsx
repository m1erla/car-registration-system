import { configureStore } from "@reduxjs/toolkit";
import carsSlice from "./cars/carsSlice";
import userSlice from "./users/userSlice";
import imageSlice from "./images/imageSlice";

export const store = configureStore ({
    reducer: {
        cars: carsSlice,
        user: userSlice,
        image: imageSlice
    }
}) 