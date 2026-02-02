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
    country: "",
    timezone: "",
    current: null,
    next7Days: [],
    message: "",
    loading: false,
    error: null,
  },

  reducers: {
    clearWeather: (state) => {
      state.city = "";
      state.country = "";
      state.timezone= "",
      state.current = null;
      state.next7Days = [];
      state.message = "";
      state.error = null;
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

        state.message = action.payload.message;

        state.city = action.payload.city_name;
        state.country = action.payload.country_code;
        state.timezone = action.payload.timezone;

        state.current = action.payload.currentDateData;
        state.next7Days = action.payload.next7daysData;
      })

      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
