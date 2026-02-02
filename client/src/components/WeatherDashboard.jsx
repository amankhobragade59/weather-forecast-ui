import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../store/weatherSlice";
import useDebounce from "../hooks/useDebounce";
import WeatherCard from "./WeatherCard.jsx";
import CurrentWeather from "./CurrentWeather.jsx";
import LocationHeader from "./LocationHeader.jsx";

const WeatherDashboard = () => {
  const [selectCity, setSelectCity] = useState("");
  const debouncedCity = useDebounce(selectCity, 600);

  const dispatch = useDispatch();

  const { city, country, timezone, current, next7Days, loading, error } =
    useSelector((state) => state.weather);

  const hasData = Boolean(current);

  useEffect(() => {
    if (debouncedCity.trim()) {
      dispatch(fetchWeatherByCity(debouncedCity.trim()));
    }
  }, [debouncedCity, dispatch]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-56">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-56">
          <p className="text-center text-red-600 font-semibold text-xl">{error}</p>
        </div>
      );
    }

    if (!debouncedCity) {
      return (
        <div className="flex justify-center items-center h-40 text-center px-4">
          <p className="text-zinc-700 text-base sm:text-lg">
            🔍 Search city to find weather information
          </p>
        </div>
      );
    }

    if (hasData) {
      return (
        <>
          <LocationHeader
            city={city}
            country={country}
            currentDate={current.valid_date}
            timezone={timezone}
          />

          <CurrentWeather current={current} />

          <div className="overflow-x-auto scrollbar-hide">
            <WeatherCard forecast={next7Days} />
          </div>
        </>
      );
    }

    return (
      <div className="flex justify-center items-center h-40 text-center px-4">
        <p className="text-zinc-700 text-base sm:text-lg">No data available</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-200 to-blue-300 px-3 sm:px-6 py-4">
      {/* Dashboard Header */}
      <div className="mb-6 text-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900">
          Weather Information Dashboard
        </p>
        <p className="text-zinc-600 text-sm sm:text-base mt-1">
          Search for a city to get real-time weather updates
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl p-4 sm:p-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            placeholder="Search city name here....."
            value={selectCity}
            onChange={(e) => setSelectCity(e.target.value)}
            className="px-4 py-3 rounded-full bg-zinc-700 text-white w-full focus:outline-sky-500 border-sky-400 border-2"
          />
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};



export default WeatherDashboard;
