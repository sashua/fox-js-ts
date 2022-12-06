import productTemplate from "../templates/productTemplate.js";
import { ALL_COMPANY } from "../utils/constants.js";

let onAddCallback = () => null;
const catalogEl = document.querySelector(".js-products");

catalogEl.addEventListener("click", ({ target }) => {
  const buttonEl = target.closest(".js-add-button");
  if (!buttonEl) {
    return;
  }
  const productEl = target.closest(".js-product");
  onAddCallback(productEl.id);
});

function render(products, company) {
  const filteredProducts =
    !company || company === ALL_COMPANY
      ? products
      : products.filter(({ brand }) => brand === company);
  catalogEl.innerHTML = filteredProducts.map(productTemplate).join("");
}

function onAdd(callback) {
  onAddCallback = callback;
}

export default { render, onAdd };
