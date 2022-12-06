import companyTemplate from "../templates/companyTemplate.js";
import { ALL_COMPANY } from "../utils/constants.js";

let onChangeCallback = () => null;
const filterEl = document.querySelector(".js-filter");
const companiesEl = filterEl.querySelector(".js-companies");

filterEl.addEventListener("submit", (e) => e.preventDefault());

filterEl.addEventListener("change", (e) => {
  const formData = new FormData(filterEl);
  onChangeCallback(Object.fromEntries(formData.entries()));
});

filterEl.elements.price.value = "100";
filterEl.elements.price.dispatchEvent(new Event("input"));

function update({ companies, company, price, minPrice, maxPrice }) {
  if (companies) {
    companiesEl.innerHTML = Object.entries(companies)
      .map(([company, number]) =>
        companyTemplate({
          company,
          number,
          value: company,
        })
      )
      .join("");
    filterEl.elements.company.value = company ?? ALL_COMPANY;
  }

  const priceEl = filterEl.elements.price;
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

function onChange(callback) {
  onChangeCallback = callback;
}

export default { update, onChange };
