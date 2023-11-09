import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8080";

const createAxiosInstance = () => {
  return axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosIstance = createAxiosInstance();

const handleResponseError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      console.error("Unauthorized access. Redirect to login page.");
      window.location.href = "/auth/login";
    }

    // Handle other status codes if needed

    return Promise.reject(data);
  } else if (error.request) {
    console.error("No response received from the server.");
    return Promise.reject(error);
  } else {
    console.error("Error setting up the request:", error.message);
    return Promise.reject(error);
  }
};

const createAsyncThunkWithAxios = (name, request) => {
  return createAsyncThunk(`cars/${name}`, async (params) => {
    try {
      const data = await request(params);
      return data.data.data;
    } catch (error) {
      return handleResponseError(error);
    }
  });
};

export const getAllCars = createAsyncThunkWithAxios("getAllCars", () =>
  axiosIstance.get(`/cars`)
);

export const getAllByBrand = createAsyncThunkWithAxios(
  "getAllByBrand",
  (brand) => axiosIstance.get(`/cars?brand=${brand}`)
);

export const getAllByModel = createAsyncThunkWithAxios(
  "getAllByModel",
  (model) => axiosIstance.get(`/cars?model=${model}`)
);

export const getAllByBrandAndModel = createAsyncThunkWithAxios(
  "getAllByBrandAndModel",
  (brandAndModel) =>
    axiosIstance.get(
      `/cars?brand=${brandAndModel.brand}&model=${brandAndModel.model}`
    )
);

export const getCarById = createAsyncThunkWithAxios(
  "getByCarIdCars",
  (carsId) =>
    axiosIstance.get(`/cars/${carsId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
);

export const axiosCarById = async (carsId) => {
  try {
    const data = await axiosIstance.get(`/cars/${carsId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data.data;
  } catch (error) {
    return handleResponseError(error);
  }
};

export const getCarByUserId = createAsyncThunkWithAxios(
  "getCarByUserId",
  (userId) =>
    axiosIstance.get(`/cars?userId=${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
);

export const addCar = createAsyncThunkWithAxios("addCar", (car) =>
  axiosIstance.post(`/cars`, car, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
);

export const deleteCar = createAsyncThunkWithAxios("deleteCar", (carId) =>
  axiosIstance.delete(`/cars/${carId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
);

export const updateCar = createAsyncThunkWithAxios("updateCar", (update) => {
  const updateObj = {
    carName: update.carName,
    model: update.model,
    brand: update.brand,
    year: update.year,
    lisencePlate: update.plate,
  };
  return axiosIstance.put(`/cars/${update.id}`, updateObj, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
});

export const axiosRegister = createAsyncThunkWithAxios(
  "axiosRegister",
  (register, { rejectWithValue }) =>
    axiosIstance.post(`/auth/register`, register).catch((error) => {
      console.error("Registration failed", error);
      return rejectWithValue(error.response.data);
    })
);

export const loginAuth = createAsyncThunkWithAxios("loginAuth", (login) =>
  axiosIstance.post(`/auth/login`, login).then((data) => {
    console.log("Login response: ", data);
    localStorage.setItem("token", data.data.message);
    localStorage.setItem("currentUserId", data.data.userId);
    localStorage.setItem("currentUserName", data.data.userName);
    return data.data;
  })
);

export const axiosLogout = createAsyncThunkWithAxios("axiosLogout", (input) =>
  axiosIstance.post(`/auth/logout`, input, {
    refresh_token: localStorage.getItem("refresh-token"),
  })
);

export const axiosGetImage = createAsyncThunkWithAxios(
  "axiosGetImage",
  (carId) =>
    axiosIstance.get(`/images?carId=${carId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
);

export const addImage = createAsyncThunkWithAxios("addImage", (image) =>
  axiosIstance.post(`/images`, image, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
);

export const changePassword = createAsyncThunkWithAxios(
  "changePassword",
  (newPassword) =>
    axiosIstance.put(
      `/users/${parseInt(localStorage.getItem("currentUserId"))}`,
      newPassword,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
);

// ... (imports)

// Utility function for making authenticated requests
// const axiosAuth = axios.create();
// axiosAuth.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// // Thunk for authenticated requests
// export const axiosAuthenticated = createAsyncThunk(
//   'axiosAuthenticated',
//   async ({ method, url, data }) => {
//     const response = await axiosAuth[method](url, data);
//     return response.data;
// });

// // Thunk for getting user data
// export const axiosMe = createAsyncThunk('auth/axiosMe', async () => {
//   const response = await axiosAuthenticated({ method: 'get', url: '/auth/me' });
//   return response;
// });

// // ... (other thunks)

// // Example usage of axiosAuthenticated
// export const addImage = createAsyncThunk('cars/addImage', async (image) => {
//   const response = await axiosAuthenticated({ method: 'post', url: '/images', data: image });
//   return response.data.data;
// });

// ... (other thunks)
