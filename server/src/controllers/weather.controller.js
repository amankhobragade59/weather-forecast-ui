import { getForecastData } from "../services/weatherService.js";

export const getCityForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const data = await getForecastData(city);
    res.status(200).json({
      status: true,
      message: "data fetched successfully",
      ...data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch forecast",
      currentDateData: null,
      next7daysData: [],
    });
  }
};
