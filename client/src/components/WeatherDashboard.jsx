import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../store/weatherSlice";
import useDebounce from "../hooks/useDebounce";
import WeatherCard from "./WeatherCard";

const WeatherDashboard = () => {
  const [selectCity, setSelectCity] = useState("");
  const debouncedCity = useDebounce(selectCity, 600);

  const dispatch = useDispatch();
  const { city, country, forecast, loading, error } = useSelector(
    (state) => state.weather,
  );

  const hasData = forecast && forecast.length > 0;
  const current = hasData ? forecast[0] : null;
  const next7Days = hasData ? forecast.slice(1, 8) : [];

  useEffect(() => {
    if (debouncedCity.trim()) {
      dispatch(fetchWeatherByCity(debouncedCity.trim()));
    }
  }, [debouncedCity, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 px-3 sm:px-6 py-4">

  {/* 🌤 Dashboard Header */}
  <div className="mb-6 text-center">
    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900">
      Weather Information Dashboard
    </p>
    <p className="text-zinc-600 text-sm sm:text-base mt-1">
      Search for a city to get real-time weather updates
    </p>
  </div>

  <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur rounded-3xl shadow-xl p-4 sm:p-6">

    {/* 🔍 Search Bar */}
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
      <input
        placeholder="Search city name here....."
        value={selectCity}
        onChange={(e) => setSelectCity(e.target.value)}
        className="px-4 py-3 rounded-full bg-zinc-700 text-white w-full focus:outline-sky-500 border-sky-400 border-2 "
      />
    </div>

    {loading && (
      <div className="flex justify-center items-center h-56">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )}

    {error && !loading && (
      <p className="text-center text-red-600">{error}</p>
    )}

    {!loading && !hasData && (
      <div className="flex justify-center items-center h-40 text-center px-4">
        <p className="text-zinc-700 text-base sm:text-lg">
          🔍 Search city to find weather information
        </p>
      </div>
    )}

    {!loading && hasData && (
      <>
        {/* City & Date */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-800">
            {city}, {country}
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm">
            {new Date(current.valid_date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Current Weather */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900">
              {current.temp}°C
            </h1>
            <p className="text-zinc-600 capitalize">
              {current.weather.description}
            </p>
          </div>

          <img
            src={`https://www.weatherbit.io/static/img/icons/${current.weather.icon}.png`}
            alt="weather"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-between gap-3 text-sm text-zinc-700 mb-6">
          <div className="w-full sm:w-auto">
            🌡 Feels like {current.app_temp}°C
          </div>
          <div className="w-full sm:w-auto">
            💧 Humidity {current.rh}%
          </div>
          <div className="w-full sm:w-auto">
            💨 Wind {current.wind_spd} km/h
          </div>
        </div>

        <div className="overflow-x-auto">
          <WeatherCard forecast={next7Days} />
        </div>
      </>
    )}
  </div>
</div>

  );
};

export default WeatherDashboard;
