import Component from "./Component.js";
import productTemplate from "../templates/cartProductTemplate.js";
import storage from "../utils/storage.js";

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.params = { cartProducts: [], onChange: () => null };

    // button actions
    this.actions = {
      open: this.toggleVisibility,
      close: this.toggleVisibility,
      checkout: this.checkoutProducts,
      delete: this.deleteProduct,
      increment: (id) => this.changeProductQty(id, 1),
      decrement: (id) => this.changeProductQty(id, -1),
    };

    this.refs = this.getRefs();
    this.bindEvents();
  }

  didInit() {
    // load saved cart state from local storage
    this.setParams({ cartProducts: storage.get() });
  }

  // ------ Component update ------
  update() {
    const { cartProducts } = this.params;
    const { productList, totalSum, totalQty } = this.refs;

    const [qty, sum] = cartProducts.reduce(
      ([qty, sum], item) => [qty + item.qty, sum + item.qty * item.price],
      [0, 0]
    );

    // render product list
    productList.innerHTML = cartProducts.map(productTemplate).join("");

    // update totals
    totalSum.textContent = `Total: $ ${sum.toFixed(2)}`;
    totalQty.textContent = qty;
    totalQty.classList[qty ? "add" : "remove"]("active");
  }

  didUpdate(prevParams) {
    const { cartProducts, onChange } = this.params;

    // save cart state lo local storage and fire onChange event
    if (cartProducts !== prevParams.cartProducts) {
      storage.set(cartProducts);
      onChange(cartProducts);
    }
  }

  // ------ Button actions ------
  toggleVisibility = () => {
    const { cart, backdrop } = this.refs;

    cart.classList.toggle("active");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  checkoutProducts = () => {
    this.setParams({ cartProducts: [] });
    this.toggleVisibility();
  };

  deleteProduct = (id) => {
    this.setParams({
      cartProducts: this.params.cartProducts.filter((item) => item.id !== id),
    });
  };

  changeProductQty = (id, change) => {
    this.setParams({
      cartProducts: this.params.cartProducts.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + change < 1 ? 1 : item.qty + change }
          : item
      ),
    });
  };

  // ------ Event handlers ------
  handleClick = ({ target }) => {
    const button = target.closest("[data-action]");
    if (!button) {
      return;
    }

    // call appropriate button action
    const action = button.dataset.action;
    this.actions[action](target.closest(".js-product")?.id);
  };

  bindEvents() {
    const { cart, backdrop, openButton } = this.refs;

    cart.addEventListener("click", this.handleClick);
    openButton.addEventListener("click", this.actions.open);
    backdrop.addEventListener("click", this.actions.close);
  }

  getRefs() {
    const cart = document.querySelector(".js-cart");
    const openButton = document.querySelector(".js-open-button");
    return {
      cart,
      openButton,
      productList: cart.querySelector(".js-products"),
      totalSum: cart.querySelector(".js-total-sum"),
      totalQty: openButton.querySelector(".js-total-qty"),
      backdrop: document.querySelector(".js-backdrop"),
    };
  }
}
