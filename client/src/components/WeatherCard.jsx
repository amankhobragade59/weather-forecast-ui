const WeatherCard = ({forecast}) => {
  return (
    <div className="flex flex-row gap-2 justify-between">
          {forecast.map((day) => (
            <div
              key={day.valid_date}
              className="flex flex-col w-40 items-center text-sm border-2 border-zinc-800 rounded-xl p-1"
            >
              <p className="text-zinc-800 font-bold text-center">{new Date(day.valid_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}</p>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                className="w-8 h-8"
              />
              <div className="flex flex-row gap-2.5 font-bold">
                <p className="text-red-500 font-semibold">
                {day.max_temp}°
              </p>
              <p className="text-blue-500">
                {day.min_temp}°
              </p>
              </div>
            </div>
          ))}
        </div>
  );
};

export default WeatherCard;
