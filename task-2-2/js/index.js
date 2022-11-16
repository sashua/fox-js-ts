import { getCheckMarkup, getCardMarkup } from "./markups.js";
import { categories, dishes } from "./data.js";

const filterEl = document.querySelector(".js-filter");
const menuEl = document.querySelector(".js-menu");

filterEl.addEventListener("click", onFilterClick);

renderFilter(categories);
renderMenu(dishes);

// ----------------------------------------------------------------------------

function onFilterClick(event) {
  const target = event.target;
  if (!target.closest("input")) {
    return;
  }

  const selectedCategory = Number(target.value);
  const filteredDishes = selectedCategory
    ? dishes.filter(({ category }) => category === selectedCategory)
    : dishes;

  renderMenu(filteredDishes);
}

function renderFilter(categories) {
  const markup = categories
    .map((name, id) => getCheckMarkup({ name, id }))
    .join("");
  filterEl.innerHTML = markup;
}

function renderMenu(dishes) {
  const markup = dishes.map(getCardMarkup).join("");
  menuEl.innerHTML = markup;
}
