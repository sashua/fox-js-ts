export function getCheckMarkup({ name, id }) {
  return `
  <label class="checkbox">
    <input
      class="checkbox__input"
        type="radio"
        name="category"
        value="${id}"
        ${id ? "" : "checked"}
    />
      <span class="checkbox__name">${name}</span>
  </label>
  `;
}

export function getCardMarkup({ image, name, price, info }) {
  return `
  <li class="card">
    <div class="card__image">
      <img src="./images/${image}" alt="${name}" />
    </div>
    <div class="card__content">
      <div class="card__header">
        <h2 class="card__name">${name}</h2>
        <p class="card__price">$ ${price.toFixed(2)}</p>
      </div>
      <p class="card__info">${info}</p>
    </div>
  </li>
  `;
}
