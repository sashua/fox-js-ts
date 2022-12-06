import catalog from "./components/catalog.js";
import filter from "./components/filter.js";
import cart from "./components/cart.js";
import db from "./utils/db.js";
import { countProps, sortProps, sum } from "./utils/helpers.js";
import { ALL_COMPANY } from "./utils/constants.js";

let allCompanies = {};
init();

function handleFilterChange({ search, company, price }) {
  const products = db.getProducts({
    search,
    maxPrice: price,
  });
  const companies = joinCompanies(allCompanies, getCompanies(products));

  filter.update({ companies, company });
  catalog.render(products, company);
}

async function init() {
  await db.fetchProducts();
  const products = db.getProducts();
  const [minPrice, maxPrice] = getMinMaxPrice(products);
  allCompanies = getCompanies(products);

  filter.onChange(handleFilterChange);
  catalog.onAdd((id) => cart.addProduct(db.getProduct(id)));

  filter.update({
    companies: allCompanies,
    price: maxPrice,
    minPrice,
    maxPrice,
  });
  catalog.render(products);
}

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
