import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosIstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      if (status === 401) {
        // Handle 401 Unauthorized error (e.g., redirect to login)
        console.error("Unauthorized access. Redirect to login page.");

        window.location.href = "/auth/login";
      }

      // You can handle other status codes here if needed

      return Promise.reject(data); // Reject the promise with the response data
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server.");
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      return Promise.reject(error);
    }
  }
);

export const getAllCars = createAsyncThunk("cars/getAllCars", async () => {
  const data = await axiosIstance.get(`/cars`);
  return data.data.data;
});

export const getAllByBrand = createAsyncThunk(
  "cars/getAllByBrand",
  async (brand) => {
    const data = await axiosIstance.get(`/cars?brand=${brand}`);
    return data.data.data;
  }
);

export const getAllByModel = createAsyncThunk(
  "cars/getAllByModel",
  async (model) => {
    const data = await axiosIstance.get(`/cars?model=${model}`);
    return data.data.data;
  }
);

export const getAllByBrandAndModel = createAsyncThunk(
  "cars/getAllByBrandAndModel",
  async (brandAndModel) => {
    const data = await axiosIstance.get(
      `/cars?brand=${brandAndModel.brand}&model=${brandAndModel.model}`
    );
    return data.data.data;
  }
);

export const getCarById = createAsyncThunk(
  "cars/getByCarIdCars",
  async (carId) => {
    const data = await axiosIstance.get(`/cars/${carId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data.data;
  }
);

export const axiosCarById = async (carId) => {
  const data = await axiosIstance.get(`/cars/${carId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data.data.data;
};

export const getCarByUserId = createAsyncThunk(
  "cars/getCarByUserId",
  async (userId) => {
    const data = await axiosIstance.get(`/cars?userId=${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data.data;
  }
);

export const addCar = createAsyncThunk("cars/addCar", async (car) => {
  const data = await axiosIstance.post(`/cars`, car, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data.data.data;
});

export const deleteCar = createAsyncThunk("cars/deleteCar", async (carId) => {
  const data = await axiosIstance.delete(`/cars/${carId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data.data.data;
});

export const updateCar = createAsyncThunk("cars/updateCar", async (update) => {
  const updateObj = {
    carName: update.carName,
    model: update.model,
    brand: update.brand,
    modelYear: update.modelYear,
    lisencePlate: update.licensePlate,
  };
  const data = await axiosIstance.put(`/cars/${update.id}`, updateObj, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return data.data.data;
});

export const axiosRegister = createAsyncThunk(
  "auth/axiosRegister",
  async (register, { rejectWithValue }) => {
    try {
      const data = await axiosIstance.post(`/auth/register`, register);
      return data.data;
    } catch (error) {
      console.error("Registration failed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAuth = createAsyncThunk("auth/loginAuth", async (login) => {
  try {
    const data = await axiosIstance.post(`/auth/login`, login);

    console.log("Login response: ", data);
    localStorage.setItem("token", data.data.message);
    localStorage.setItem("currentUserId", data.data.userId);
    localStorage.setItem("currentUserName", data.data.userName);
    return data.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
});

export const axiosLogout = async (input) => {
  const data = await axiosIstance.post(`/auth/logout`, input, {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data.data;
};

export const axiosGetImage = createAsyncThunk(
  "cars/axiosGetImage",
  async (carId) => {
    const data = await axiosIstance.get(`/images?carId=${carId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data.data;
  }
);

export const addImage = createAsyncThunk(
  "cars/axiosGetImage",
  async (image) => {
    const data = await axiosIstance.post(`/images`, image, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data.data.data;
  }
);

export const changePassword = createAsyncThunk(
  "cars/changePassword",
  async (newPassword) => {
    const data = await axiosIstance.put(
      `/users/${parseInt(localStorage.getItem("currentUserId"))}`,
      newPassword,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return data.data;
  }
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
