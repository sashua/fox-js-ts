import companyTemplate from "../templates/companyTemplate.js";
import { ALL_COMPANY } from "../utils/constants.js";

let onChangeHandler = () => null;
const refs = getRefs();
bindEvents();

// ------ API ------
function init({ onChange }) {
  onChangeHandler = onChange;
}

function update({ companies, company, price, minPrice, maxPrice }) {
  const elements = refs.filter.elements;
  if (companies) {
    refs.companies.innerHTML = Object.entries(companies)
      .map(([company, number]) =>
        companyTemplate({
          company,
          number,
          value: company,
        })
      )
      .join("");
    elements.company.value = company ?? ALL_COMPANY;
  }

  const priceEl = elements.price;
  if (minPrice) {
    priceEl.min = minPrice;
  }
  if (maxPrice) {
    priceEl.max = maxPrice;
  }
  if (price) {
    priceEl.value = price;
    priceEl.dispatchEvent(new Event("input"));
  }
}

// ------ Handlers ------
function handleFilterChange() {
  const formData = new FormData(refs.filter);
  onChangeHandler(Object.fromEntries(formData.entries()));
}

// ------ Init ------
function getRefs() {
  const filter = document.querySelector(".js-filter");
  return {
    filter,
    companies: filter.querySelector(".js-companies"),
  };
}

function bindEvents() {
  refs.filter.addEventListener("submit", (e) => e.preventDefault());
  refs.filter.addEventListener("change", handleFilterChange);
}

export default { init, update };
