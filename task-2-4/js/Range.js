export default class Range {
  #input;
  #output;

  constructor(selector) {
    this.#input = document.querySelector(`${selector} input[type="range"]`);
    this.#output = document.querySelector(`${selector} output`);

    this.#input.addEventListener(
      "input",
      () => (this.#output.textContent = this.#input.value)
    );
  }
}
