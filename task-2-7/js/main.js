import { fetchCountries, getRegions, filterCountries } from "./countries.js";
import { countryTemplate } from "./countryTemplate.js";

const ALL_COUNTRIES_CAPTION = "All the world";

const refs = getRefs();
let countries = [];
bindEvents();

fetchCountries().then((result) => {
  countries = result;
  renderRegions(getRegions(countries));
  renderCountries(countries);
});

// ------ Event handlers ------
function onFilterChange() {
  const query = refs.query.value;
  const region = refs.region.value;
  renderCountries(filterCountries(countries, { query, region }));
}

function onSelectClick({ target }) {
  if (target.classList.contains("select__option")) {
    refs.region.value =
      target.textContent === ALL_COUNTRIES_CAPTION ? "" : target.textContent;
    onFilterChange();
  }
  if (target === refs.region) {
    refs.select.classList.toggle("active");
  }
}

function onThemeChange({ target }) {
  if (target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  target.parentElement.querySelector(".theme__name").textContent =
    target.checked ? "Light mode" : "Dark mode";
}

// ------ Render elements ------
function renderCountries(countries) {
  refs.countries.innerHTML = countries.map(countryTemplate).join("");
}

function renderRegions(regions) {
  const markup = [ALL_COUNTRIES_CAPTION, ...regions]
    .map((name) => `<li class="select__option">${name}</li>`)
    .join("");
  refs.select.querySelector(".select__options").innerHTML = markup;
}

// ------ Init helpers ------
function bindEvents() {
  refs.query.addEventListener("input", onFilterChange);
  refs.select.addEventListener("click", onSelectClick);
  refs.isDark.addEventListener("change", onThemeChange);
}

function getRefs() {
  return {
    isDark: document.querySelector('[name="isDark"]'),
    query: document.querySelector('[name="query"]'),
    region: document.querySelector('[name="region"]'),
    select: document.querySelector(".select"),
    countries: document.querySelector(".countries"),
  };
}
