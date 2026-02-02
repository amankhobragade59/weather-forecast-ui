const WeatherCard = ({ forecast }) => {
  return (
    <div className="flex gap-3">
      {forecast.map((day) => (
        <div
          key={day.valid_date}
          className="flex flex-col justify-between items-center
                     w-40 h-32
                     border-2 border-zinc-800
                     rounded-xl p-2 text-sm"
        >
          {/* date */}
          <p className="text-zinc-800 font-bold text-center min-h-10">
            {new Date(day.valid_date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>

          {/* Icon */}
          <img
            src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
            alt="weather"
            className="w-8 h-8"
          />

          {/* Temps */}
          <div className="flex gap-3 font-bold">
            <p className="text-red-500">{day.max_temp}°</p>
            <p className="text-blue-500">{day.min_temp}°</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
