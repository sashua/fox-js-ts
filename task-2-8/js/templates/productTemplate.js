function productTemplate({ id, img, brand, model, info, price }) {
  return `
  <li id="${id}" class="product js-product">
    <div class="product__photo">
      <img
        class="product__img"
        src="img/products/${img}"
        alt="${model}"
      />
    </div>
    <div class="product__info">
      <h3 class="product__name">${brand} ${model}</h3>
      <p class="product__text">${info}</p>
      <div class="product__price-wrap">
        <p class="product__price">$ ${price.toFixed(2)}</p>
        <button
          class="icon-button icon-button--accent"
          type="button"
          aria-label="Add to cart"
          data-action="buy"
        >
          <svg width="14" height="16">
            <use href="./img/icons.svg#bag-shopping"></use>
          </svg>
        </button>
      </div>
    </div>
  </li>`;
}

export default productTemplate;
