import Catalog from "./components/Catalog.js";
import db from "./utils/db.js";

init();

async function init() {
  const catalog = new Catalog();
  catalog.setParams({ products: await db.getFeaturedProducts(4) });
}
