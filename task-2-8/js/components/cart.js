import productTemplate from "../templates/cartProductTemplate.js";
import storage from "../utils/localStorage.js";

const openButtonEl = document.querySelector(".js-open-button");
const backdropEl = document.querySelector(".js-backdrop");
const cartEl = document.querySelector(".js-cart");
const productsEl = cartEl.querySelector(".js-products");
const totalEl = cartEl.querySelector(".js-total");

openButtonEl.addEventListener("click", open);
backdropEl.addEventListener("click", close);

cartEl.addEventListener("click", ({ target }) => {
  if (target.closest(".js-close-button")) {
    close();
    return;
  }
  if (target.closest(".js-checkout-button")) {
    checkout();
    close();
    return;
  }

  const productEl = target.closest(".js-product");
  if (!productEl) {
    return;
  }
  if (target.closest(".js-delete-button")) {
    deleteProduct(productEl.id);
    update();
    return;
  }
  const qtyEl = productEl.querySelector(".js-qty");
  let qty = Number(qtyEl.value);
  if (target.closest(".js-inc-button")) {
    qty += 1;
    qtyEl.value = qty;
    setProductQty(productEl.id, qty);
    update();
    return;
  }
  if (target.closest(".js-dec-button")) {
    qty -= qty > 1 ? 1 : 0;
    qtyEl.value = qty;
    setProductQty(productEl.id, qty);
    update();
    return;
  }
});

function open() {
  update();
  backdropEl.classList.add("active");
  cartEl.classList.add("active");
}

function close() {
  backdropEl.classList.remove("active");
  cartEl.classList.remove("active");
}

function addProduct(item) {
  const products = storage.get();
  const found = products.find(({ id }) => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    products.push({ ...item, qty: 1 });
  }
  storage.set(products);
}

function deleteProduct(id) {
  const products = storage.get().filter((item) => item.id !== id);
  storage.set(products);
}

function setProductQty(id, qty) {
  const products = storage.get();
  const found = products.find((item) => item.id === id);
  if (found) {
    found.qty = qty;
  }
  storage.set(products);
}

function checkout() {
  alert("Order accepted!");
  storage.remove();
}

function getTotal(products) {
  return products.reduce((total, { price, qty }) => total + price * qty, 0);
}

function update() {
  const products = storage.get();
  productsEl.innerHTML = products.map(productTemplate).join("");
  totalEl.textContent = `Total: $ ${getTotal(products).toFixed(2)}`;
}

export default { open, addProduct };
