import { addSticker } from "../utils/addStickers.js";

const refs = {
  button: document.querySelector('[data-action="open"]'),
};

function init({ onClick }) {
  refs.button.addEventListener("click", onClick);
}

function update({ text }) {
  addSticker(refs.button, text);
}

export default { init, update };

// export default class OpenButton {
//   constructor(selector, props) {}

//   bindEvents() {
//     this.refs.root.addEventListener("click", this.handlers.onClick);
//   }

//   setProps({ stickers, onClick }) {
//     this.handlers = { onClick };
//   }

//   setRefs(selector) {
//     this.refs = {
//       root: document.querySelector(selector),
//     };
//   }
// }
