import FilteredCatalog from "./components/FilteredCatalog.js";
import db from "./utils/db.js";

init();

async function init() {
  const catalog = new FilteredCatalog();
  catalog.setParams({ products: await db.getProducts() });
}
