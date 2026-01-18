import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/weather-forecast/${city}`);
      return res.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    country:"",
    forecast: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWeather: (state) => {
      state.forecast = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.data.city_name;
        state.country = action.payload.data.country_code;
        state.forecast = action.payload.data.data; 
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
