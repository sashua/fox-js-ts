import productTemplate from "../templates/productTemplate.js";
import { addSticker } from "../utils/addStickers.js";
import { ALL_COMPANY } from "../utils/constants.js";

const actions = {
  buy: () => null,
};
const refs = getRefs();
bindEvents();

// ------ API ------
function init({ onBuy }) {
  actions.buy = onBuy;
}

function update({ products, company, cartProducts }) {
  if (products) {
    const filteredProducts =
      !company || company === ALL_COMPANY
        ? products
        : products.filter(({ brand }) => brand === company);
    refs.catalog.innerHTML = filteredProducts.map(productTemplate).join("");
  }

  if (cartProducts) {
    refs.catalog
      .querySelectorAll('.js-product button[data-action="buy"]')
      .forEach((button) => {
        const id = button.closest(".js-product").id;
        addSticker(button, cartProducts[id]);
      });
  }
}

// ------ Handlers ------
function handleCatalogClick({ target }) {
  const buttonEl = target.closest("[data-action]");
  if (!buttonEl) {
    return;
  }
  const action = buttonEl.dataset.action;
  const id = target.closest(".js-product").id;
  actions[action](id);
}

// ------ Init ------
function getRefs() {
  return {
    catalog: document.querySelector(".js-catalog"),
  };
}

function bindEvents() {
  refs.catalog.addEventListener("click", handleCatalogClick);
}

export default { init, update };
