import openButton from "./components/openButton.js";
import catalog from "./components/catalog.js";
import filter from "./components/filter.js";
import cart from "./components/cart.js";
import db from "./utils/db.js";
import { countProps, sortProps, sum } from "./utils/helpers.js";
import { ALL_COMPANY } from "./utils/constants.js";

let allCompanies = {};
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

function handleFilterChange({ search, company, price }) {
  const products = db.getProducts({
    search,
    maxPrice: price,
  });
  const companies = joinCompanies(allCompanies, getCompanies(products));

  filter.update({ companies, company });
  catalog.update({ products, company, cartProducts });
}

// ------ Init ------
async function init() {
  await db.fetchProducts();
  const products = db.getProducts();
  const [minPrice, maxPrice] = getMinMaxPrice(products);
  allCompanies = getCompanies(products);

  openButton.init({ onClick: cart.open });

  cart.init({ onChange: handleCartChange });
  cart.update();

  filter.init({ onChange: handleFilterChange });
  filter.update({
    companies: allCompanies,
    price: maxPrice,
    minPrice,
    maxPrice,
  });

  catalog.init({ onBuy: handleBuyProduct });
  catalog.update({ products });
}

// ------ Helpers ------
function getCompanies(products) {
  const companies = sortProps(countProps(products, "brand"));
  return { [ALL_COMPANY]: sum(...Object.values(companies)), ...companies };
}

function joinCompanies(all, other) {
  return Object.keys(all).reduce(
    (companies, key) => ({ ...companies, [key]: other[key] ?? 0 }),
    {}
  );
}

function getMinMaxPrice(products) {
  const maxPrice = products.reduce(
    (max, { price }) => (price > max ? price : max),
    0
  );
  const minPrice = products.reduce(
    (min, { price }) => (price < min ? price : min),
    maxPrice
  );
  return [minPrice, maxPrice];
}
