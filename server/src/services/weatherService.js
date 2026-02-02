import { axiosInstance } from "../utils/axios.js";
import cache from "../utils/cache.js";

export const getForecastData = async (city) => {
  const cacheKey = `forecast:${city.toLowerCase()}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const response = await axiosInstance.get("/daily", {
    params: {
      city,
      key: process.env.API_KEY,
    },
  });

  const forecastData = response.data?.data || [];
  if (!forecastData.length) {
    return { currentDateData: null, next7daysData: [] };
  }

  const currentDateData = forecastData[0];
  const next7daysData = forecastData.slice(1, 8);

  const processedData = {
    currentDateData,
    next7daysData,
    city_name: response.data.city_name,
    country_code: response.data.country_code,
    timezone: response.data.timezone,
  };

  cache.set(cacheKey, processedData);

  return processedData;
};
