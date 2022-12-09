import { DATA_PATH } from "./constants.js";
import { shuffle, sort } from "./helpers.js";

async function getProducts(path = DATA_PATH) {
  const response = await fetch(path);
  const products = await response.json();
  return sort(products, "name").sort((a, b) => b.price - a.price);
}

async function getFeaturedProducts(number = 1) {
  return shuffle(await getProducts()).slice(0, number);
}

export default { getProducts, getFeaturedProducts };
