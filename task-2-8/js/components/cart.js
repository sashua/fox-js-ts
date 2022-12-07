import productTemplate from "../templates/cartProductTemplate.js";
import storage from "../utils/localStorage.js";

let onChangeHandler = () => null;
const actions = {
  open,
  close,
  checkout,
  delete: deleteProduct,
  inc: (target) => changeProductQty(target, 1),
  dec: (target) => changeProductQty(target, -1),
};
const refs = getRefs();
bindEvents();

// ------ API ------
function init({ onChange }) {
  onChangeHandler = onChange;
}

function update(props) {
  let { products } = props || {};

  // Save new products to storage if needed
  if (products) {
    storage.set(products);
  } else {
    products = storage.get();
  }

  // Update shopping cart view
  refs.products.innerHTML = products.map(productTemplate).join("");
  const total = products.reduce(
    (total, { price, qty }) => total + price * qty,
    0
  );
  refs.total.textContent = `Total: $ ${total.toFixed(2)}`;

  // Throw event
  onChangeHandler(
    products.reduce((obj, { id, qty }) => ({ ...obj, [id]: qty }), {})
  );
}

function open() {
  refs.backdrop.classList.add("active");
  refs.cart.classList.add("active");
  document.body.classList.add("no-scroll");
  update({});
}

function addProduct(item) {
  const products = storage.get();
  const found = products.find(({ id }) => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    products.push({ ...item, qty: 1 });
  }
  update({ products });
}

// ------ Handlers ------
function handleCartClick({ target }) {
  const buttonEl = target.closest("[data-action]");
  if (!buttonEl) {
    return;
  }
  const productEl = target.closest(".js-product");
  const action = buttonEl.dataset.action;
  actions[action](productEl);
}

function close() {
  refs.backdrop.classList.remove("active");
  refs.cart.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function checkout() {
  storage.remove();
  close();
  update({ products: [] });
}

function deleteProduct(target) {
  const id = target.id;
  const products = storage.get().filter((item) => item.id !== id);
  update({ products });
}

function changeProductQty(target, value) {
  const qtyEl = target.querySelector('input[name="qty"]');
  let qty = Number(qtyEl.value) + value;
  qty = qty < 1 ? 1 : qty;
  qtyEl.value = qty;

  const id = target.id;
  const products = storage.get();
  const found = products.find((item) => item.id === id);
  if (found) {
    found.qty = qty;
  }
  update({ products });
}

// ------ Init ------
function getRefs() {
  const cart = document.querySelector(".js-cart");
  return {
    cart,
    products: cart.querySelector(".js-products"),
    total: cart.querySelector(".js-total"),
    backdrop: document.querySelector(".js-backdrop"),
  };
}

function bindEvents() {
  refs.cart.addEventListener("click", handleCartClick);
  refs.backdrop.addEventListener("click", close);
}

export default { init, update, open, addProduct };
