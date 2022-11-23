export function formatLocationName({ name, state, country }) {
  return `${name}${state ? `, ${state}` : ""}${country ? `, ${country}` : ""}`;
}

export function formatTemp(temp) {
  return `${Math.round(temp)}℃`;
}

export function prepareCurrentWeather(weather) {
  const {
    weather: [{ main: description, icon }],
    main: { temp, feels_like: feelsLike },
    sys: { country },
    name,
  } = weather;
  return {
    temp,
    feelsLike,
    description,
    locationName: formatLocationName({ name, country }),
    icon,
  };
}

export function prepareDailyForecast(forecast) {
  const today = getWeekday(Date());

  const dailyForecast = forecast?.list
    ?.map(({ dt, main: { temp }, weather: [{ description, icon }] }) => ({
      day: getWeekday(dt * 1000),
      temp,
      description,
      icon,
    }))
    .filter(({ day }) => day !== today)
    .reduce((result, record) => {
      const { day, temp, description, icon } = record;
      const dayForecast = result[day] ?? {
        day,
        maxTemp: temp,
        minTemp: temp,
        description,
        icon,
      };
      if (dayForecast.maxTemp < temp) {
        dayForecast.maxTemp = temp;
        dayForecast.description = description;
        dayForecast.icon = icon;
      }
      if (dayForecast.minTemp > temp) {
        dayForecast.minTemp = temp;
      }
      result[day] = dayForecast;
      return result;
    }, {});

  return Object.values(dailyForecast);
}

function getWeekday(timestamp) {
  return new Date(timestamp).toLocaleDateString("en", { weekday: "short" });
}
