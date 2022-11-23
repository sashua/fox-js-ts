import { ICONS_URL } from "./constants.js";
import { formatLocationName, formatTemp } from "./helpers.js";

export function getLocationsMarkup(locations) {
  return locations
    .map(
      ({ name, state, country }, index) => `
        <li class="locations__item" data-index="${index}">
          ${formatLocationName({
            name,
            state,
            country,
          })}
        </li>
      `
    )
    .join("");
}

export function getCurrentWeatherMarkup({
  temp,
  feelsLike,
  description,
  locationName,
  icon,
}) {
  return `
    <div class="current__block">
      <span class="current__temp">${formatTemp(temp)}</span>
      <span class="current__feels-like">
        Feels like
        ${formatTemp(feelsLike)}
      </span>
    </div>
    <div class="current__block">
      <span class="current__description">${description}</span>
      <span class="current__location">
        ${locationName}
      </span>
    </div>
    <div class="current__block">
      <img
        class="current__icon"
        src="${ICONS_URL}/${icon}@2x.png"
        alt="${description}"
      />
    </div>
  `;
}

export function getForecastMarkup(dailyForecast) {
  return dailyForecast
    .map(
      ({ day, icon, description, maxTemp, minTemp }) => `
        <li class="forecast__item">
          <span class="forecast__day">${day}</span>
          <img
            class="forecast__icon"
            src="${ICONS_URL}/${icon}.png"
            alt="${description}"
          />
          <span class="forecast__description">${description}</span>
          <div class="forecast__block">
            <span class="forecast__max-temp">${formatTemp(maxTemp)}</span>
            <span class="forecast__min-temp">${formatTemp(minTemp)}</span>
          </div>
        </li>
      `
    )
    .join("");
}
