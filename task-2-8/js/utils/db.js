import { DATA_PATH } from "./constants.js";
import { shuffle, sortByKey } from "./helpers.js";

let products = [];

async function fetchProducts(path = DATA_PATH) {
  const response = await fetch(path);
  products = await response.json();
  products = sortByKey(products, "name").sort((a, b) => b.price - a.price);
}

function getProducts(filter) {
  if (!filter) {
    return products;
  }
  const { search, maxPrice } = filter;
  const searchQuery = search?.trim().toLowerCase();
  return products.filter(
    ({ model, brand, info, price }) =>
      (searchQuery
        ? model.toLowerCase().includes(searchQuery) ||
          brand.toLowerCase().includes(searchQuery) ||
          info.toLowerCase().includes(searchQuery)
        : true) && (maxPrice ? price <= maxPrice : true)
  );
}

function getFeaturedProducts(num = 1) {
  return shuffle(products).slice(0, num);
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

export default { fetchProducts, getProducts, getFeaturedProducts, getProduct };
