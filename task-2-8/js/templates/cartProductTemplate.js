export default function cardProductTemplate({
  id,
  img,
  brand,
  model,
  price,
  qty,
}) {
  return `
  <li id="${id}" class="cart-product js-product">
    <button
      class="icon-button icon-button--accent cart-product__delete"
      type="button"
      aria-label="Delete from cart"
      data-action="delete"
      >
      <svg width="14" height="16">
        <use href="./img/icons.svg#trash"></use>
      </svg>
    </button>
    <img
      class="cart-product__img"
      src="./img/products/${img}"
      alt="${model}"
    />
    <div class="cart-product__info">
      <h3 class="cart-product__name">${brand} ${model}</h3>
      <p class="cart-product__price">$ ${price.toFixed(2)}</p>
    </div>
    <div class="counter">
      <button
        class="icon-button counter__button"
        type="button"
        aria-label="Increment quantity"
        data-action="increment"
        >
        <svg width="16" height="16">
          <use href="./img/icons.svg#chevron-up"></use>
        </svg>
      </button>
      <input
        class="counter__input js-qty"
        type="number"
        name="qty"
        min="1"
        value="${qty}"
        disabled
      />
      <button
        class="icon-button counter__button"
        type="button"
        aria-label="Decrement quantity"
        data-action="decrement"
        >
        <svg width="16" height="16">
          <use href="./img/icons.svg#chevron-down"></use>
        </svg>
      </button>
    </div>
  </li>
  `;
}
