import openButton from "./components/openButton.js";
import catalog from "./components/catalog.js";
import cart from "./components/cart.js";
import db from "./utils/db.js";
import { sum } from "./utils/helpers.js";

let cartProducts = {};
init();

// ------ Handlers ------
function handleBuyProduct(id) {
  cart.addProduct(db.getProduct(id));
}

function handleCartChange(products) {
  cartProducts = products;
  openButton.update({ text: sum(...Object.values(products)) });
  catalog.update({ cartProducts });
}

// ------ Init ------
async function init() {
  await db.fetchProducts();

  openButton.init({ onClick: cart.open });

  cart.init({ onChange: handleCartChange });
  cart.update();

  catalog.init({ onBuy: handleBuyProduct });
  catalog.update({ products: db.getFeaturedProducts(4), cartProducts });
}
