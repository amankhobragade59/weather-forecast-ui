const LocationHeader = ({ city, country, currentDate, timezone }) => {
  if (!currentDate) return null;

  const formattedDate = new Date(currentDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-800">
          {city}, {country}
        </h2>
        {timezone && (
          <p className="text-zinc-700 text-lg font-medium sm:text-sm">{timezone}</p>
        )}
      </div>
      <p className="text-zinc-600 text-xs sm:text-sm">{formattedDate}</p>
    </div>
  );
};

export default LocationHeader;
