const CurrentWeather = ({ current }) => {
  if (!current) return null;

  return (
    <>
      {/* Temperature & Icon */}
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
          🌡 Feels like {current.temp}°C
        </div>
        <div className="w-full sm:w-auto">💧 Humidity {current.rh}%</div>
        <div className="w-full sm:w-auto">💨 Wind {current.wind_spd} km/h</div>
      </div>
    </>
  );
};

export default CurrentWeather;
