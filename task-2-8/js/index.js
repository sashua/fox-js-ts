import catalog from "./components/catalog.js";
import cart from "./components/cart.js";
import db from "./utils/db.js";

init();

async function init() {
  await db.fetchProducts();
  catalog.onAdd((id) => cart.addProduct(db.getProduct(id)));
  catalog.render(db.getFeaturedProducts(4));
}
