import Validator from "./Validator.js";

// --- Validates required text, email and password inputs ---
export default class FormValidator {
  #validator;
  #formElem;
  #requiredElems;

  constructor(selector) {
    this.#validator = new Validator();

    this.#formElem = document.querySelector(selector);
    this.#formElem.setAttribute("novalidate", "");
    this.#requiredElems = this.#formElem.querySelectorAll(
      "input.field__text[required]"
    );

    this.#formElem.addEventListener("submit", (e) => this.onSubmit(e));
    this.#requiredElems.forEach((elem) =>
      elem.addEventListener("blur", ({ target }) => this.validateField(target))
    );
  }

  onSubmit(e) {
    e.preventDefault();
    let isFormValid = true;

    this.#requiredElems.forEach(
      (inputElem) =>
        (isFormValid = this.validateField(inputElem) && isFormValid)
    );

    if (isFormValid) {
      alert("Congratulations! The form is valid!");
      this.#formElem.reset();
    }
  }

  validateField(inputElem) {
    const fieldElem = inputElem.closest(".field");
    const errorElem = fieldElem.querySelector(".field__error");
    const title = fieldElem.querySelector(".field__title").textContent;

    let errorMessage;
    if (!this.#validator.isRequired(inputElem.value)) {
      errorMessage = `${title} is required`;
    } else if (
      inputElem.type === "email" &&
      !this.#validator.isEmail(inputElem.value)
    ) {
      errorMessage = `Please enter a valid ${title}`;
    } else if (
      inputElem.type === "password" &&
      inputElem.name === "password" &&
      !this.#validator.isPassword(inputElem.value)
    ) {
      errorMessage = `${title} is not secure`;
    } else if (
      inputElem.type === "password" &&
      inputElem.name === "passwordConfirm" &&
      inputElem.value !== this.#formElem.elements.password.value
    ) {
      const passwordTitle = this.#formElem.elements.password
        .closest(".field")
        .querySelector(".field__title").textContent;
      errorMessage = `${title} must be equal to ${passwordTitle}`;
    }

    const isValid = !Boolean(errorMessage);
    if (isValid) {
      inputElem.classList.remove("field__text--invalid");
      errorElem.textContent = "";
    } else {
      inputElem.classList.add("field__text--invalid");
      errorElem.textContent = errorMessage;
    }
    return isValid;
  }
}
