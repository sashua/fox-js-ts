import {
  SERVER_ERROR_MESSAGE,
  LOCATION_ERROR_MESSAGE,
  WEATHER_ERROR_MESSAGE,
} from "./constants.js";
import {
  formatLocationName,
  prepareCurrentWeather,
  prepareDailyForecast,
} from "./helpers.js";
import {
  getLocationsMarkup,
  getCurrentWeatherMarkup,
  getForecastMarkup,
} from "./templates.js";
import { getLocations, getWeather, getForecast } from "./weatherApi.js";

const elements = getElements();
let foundLocations = [];
bindEvents();

// ------ Search submit handler ------
async function onSearchSubmit(event) {
  event.preventDefault();
  const query = event.target.query.value.trim();
  if (!query) {
    return;
  }

  clearLocations();
  hideError();
  showLoader();

  try {
    foundLocations = (await getLocations(query)) ?? [];
    if (foundLocations.length) {
      renderLocations(foundLocations);
    } else {
      showError(LOCATION_ERROR_MESSAGE);
    }
  } catch {
    foundLocations = [];
    showError(SERVER_ERROR_MESSAGE);
  }
  hideLoader();
}

// ---- Search reset handler ----
function onSearchReset() {
  clearLocations();
  hideError();
  hideLoader();
}

// ---- Location select handler ----
async function onLocationsClick(event) {
  const target = event.target.closest(".locations__item");
  if (!target) {
    return;
  }
  const selectedLocation = foundLocations[target.dataset.index];
  elements.search.elements.query.value = formatLocationName(selectedLocation);

  clearLocations();
  hideError();
  showLoader();

  try {
    const [weather, forecast] = await Promise.all([
      getWeather(selectedLocation),
      getForecast(selectedLocation),
    ]);
    if (weather && forecast) {
      renderWeather(weather, forecast);
    } else {
      showError(WEATHER_ERROR_MESSAGE);
    }
  } catch {
    showError(SERVER_ERROR_MESSAGE);
  }
  hideLoader();
}

// ------ Render functions ------
function renderLocations(locations) {
  elements.locations.innerHTML = getLocationsMarkup(locations);
}

function clearLocations() {
  foundLocations = [];
  elements.locations.innerHTML = "";
}

function renderWeather(weather, forecast) {
  const currentWeather = prepareCurrentWeather(weather);
  const dailyForecast = prepareDailyForecast(forecast);
  elements.currentWeather.innerHTML = getCurrentWeatherMarkup(currentWeather);
  elements.forecast.innerHTML = getForecastMarkup(dailyForecast);
}

function showError(message) {
  elements.error.innerHTML = message;
}

function hideError() {
  elements.error.innerHTML = "";
}

function showLoader() {
  elements.loader.hidden = false;
}

function hideLoader() {
  elements.loader.hidden = true;
}

// ------ Init functions ------
function getElements() {
  return {
    search: document.querySelector(".search"),
    locations: document.querySelector(".locations"),
    currentWeather: document.querySelector(".current"),
    forecast: document.querySelector(".forecast"),
    error: document.querySelector(".error"),
    loader: document.querySelector(".loader"),
  };
}

function bindEvents() {
  elements.search.addEventListener("submit", onSearchSubmit);
  elements.search.addEventListener("reset", onSearchReset);
  elements.locations.addEventListener("click", onLocationsClick);
}
