function companyTemplate({ company, number, value }) {
  return `
  <label class="checkbox">
    <input
      class="checkbox__input"
      type="radio"
      name="company"
      value="${value}"
      ${!number ? "disabled" : ""}
    />
    <span class="checkbox__custom">
      <svg width="16" height="16">
        <use href="./img/icons.svg#check"></use>
      </svg>
    </span>
    <span class="checkbox__caption">${company}</span>
    <span class="checkbox__text">${number}</span>
  </label>
  `;
}

export default companyTemplate;
