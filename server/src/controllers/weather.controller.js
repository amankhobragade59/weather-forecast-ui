import { axiosInstance } from '../utils/axios.js';
import cache from '../utils/cache.js';

export const getCityForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const cacheKey = `forecast:${city.toLowerCase()}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("cached data");
      return res.status(200).json({
        status: 'true',
        message:"data fetched successfully",
        data: cachedData,
      });
    }

    const response = await axiosInstance.get('/daily', {
      params: {
        city,
        key: process.env.API_KEY,
      },
    });

    cache.set(cacheKey, response.data);
    console.log("api data");
    return res.status(200).json({
      status: 'true',
      message:"data fetched successfully",
      data: response.data,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({
      status: 'false',
      message: 'Failed to fetch forecast',
      data:[]
    });
  }
};
