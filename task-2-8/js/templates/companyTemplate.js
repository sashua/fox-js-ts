export default function companyTemplate({ name, qty }) {
  return `
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="radio"
      name="company"
      value="${name}"
      ${!qty ? "disabled" : ""}
    />
    <span class="checkbox__custom">
      <svg width="16" height="16">
        <use href="./img/icons.svg#check"></use>
      </svg>
    </span>
    <span class="checkbox__caption">${name}</span>
    <span class="checkbox__text">${qty}</span>
  </label>
  `;
}
