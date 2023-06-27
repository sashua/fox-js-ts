import Component from "./Component.js";
import ShoppingCart from "./ShoppingCart.js";
import productTemplate from "../templates/productTemplate.js";

export default class Catalog extends Component {
  constructor() {
    super();
    this.params = { products: [], cartProducts: [] };
    this.refs = this.getRefs();
    this.bindEvents();
  }

  // ------ Component update ------
  update() {
    const { products, cartProducts } = this.params;
    const { catalog, shoppingCart } = this.refs;

    const productsQty = Object.fromEntries(
      cartProducts.map(({ id, qty }) => [id, qty])
    );

    // render products list
    catalog.innerHTML = products
      .map((item) =>
        productTemplate({ ...item, qty: productsQty[item.id] ?? 0 })
      )
      .join("");

    // update shopping cart
    shoppingCart.setParams({ cartProducts });
  }

  // ------ Event handlers ------
  handleClick = ({ target }) => {
    if (!target.closest('[data-action="buy"]')) {
      return;
    }

    const id = target.closest(".js-product").id;
    const { products, cartProducts } = this.params;

    // add product to cart
    const found = cartProducts.find((item) => item.id === id);
    if (found) {
      found.qty += 1;
      this.setParams({ cartProducts: [...cartProducts] });
    } else {
      const product = products.find((item) => item.id === id);
      this.setParams({
        cartProducts: [...cartProducts, { ...product, qty: 1 }],
      });
    }
  };

  bindEvents() {
    const { catalog, shoppingCart } = this.refs;

    catalog.addEventListener("click", this.handleClick);
    shoppingCart.setParams({
      onChange: (cartProducts) => this.setParams({ cartProducts }),
    });
  }

  getRefs() {
    return {
      catalog: document.querySelector(".js-catalog"),
      shoppingCart: new ShoppingCart(),
    };
  }
}
