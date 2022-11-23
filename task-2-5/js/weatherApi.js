import {
  API_KEY,
  GEOCODING_URL,
  WEATHER_URL,
  FORECAST_URL,
} from "./constants.js";

export function getLocations(query) {
  return getData(GEOCODING_URL, {
    q: query,
    appid: API_KEY,
    limit: 5,
  });
}

export function getWeather({ lat, lon }) {
  return getData(WEATHER_URL, {
    lat,
    lon,
    appid: API_KEY,
    units: "metric",
  });
}

export function getForecast({ lat, lon }) {
  return getData(FORECAST_URL, { lat, lon, appid: API_KEY, units: "metric" });
}

async function getData(url, params) {
  try {
    const response = await fetch(url + "?" + new URLSearchParams(params));
    if (!response.ok) {
      throw new Error(
        `Server response is not OK: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
