import openButton from "./components/openButton.js";
import cart from "./components/cart.js";
import { sum } from "./utils/helpers.js";

init();

// ------ Handlers ------
function handleCartChange(products) {
  const number = sum(...Object.values(products));
  openButton.update({ text: number ? number : "" });
}

// ------ Init ------
function init() {
  openButton.init({ onClick: cart.open });

  cart.init({ onChange: handleCartChange });
  cart.update();
}
