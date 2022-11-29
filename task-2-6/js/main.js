import * as todo from "./todo.js";
import { itemTemplate } from "./itemTemplate.js";

const elems = getElems();
bindEvents();
renderItems(todo.getAll());

// ------ event handlers ------
function onNewSubmit(e) {
  e.preventDefault();
  const text = e.target.text.value.trim();
  if (!text) {
    return;
  }
  renderItems(todo.addItem(text));
  e.target.reset();
}

function onItemsClick({ target }) {
  const buttonElem = target.closest(".item__button");
  if (!buttonElem) {
    return;
  }
  const itemElem = target.closest(".item");
  switch (buttonElem.dataset.action) {
    case "edit":
      editItem(itemElem);
      break;
    case "save":
      saveItem(itemElem);
      break;
    case "delete":
      deleteItem(itemElem);
      break;
  }
}

function onItemsKeyPress(e) {
  if (e.key !== "Enter") {
    return;
  }
  const itemElem = e.target.closest(".item");
  saveItem(itemElem);
  e.preventDefault();
}

function onClearClick() {
  renderItems(todo.clearAll());
}

// ------ render helpers ------
function editItem(itemElem) {
  const editButtonElem = itemElem.querySelector(".item__button--edit");
  const textElem = itemElem.querySelector(".item__text");
  editButtonElem.dataset.action = "save";
  textElem.contentEditable = true;
  textElem.focus();
}

function saveItem(itemElem) {
  const textElem = itemElem.querySelector(".item__text");
  const text = textElem.textContent.trim();
  if (!text) {
    deleteItem(itemElem);
    return;
  }
  const editButtonElem = itemElem.querySelector(".item__button--edit");
  editButtonElem.dataset.action = "edit";
  textElem.contentEditable = false;
  renderItems(todo.changeItem(itemElem.id, text));
}

function deleteItem(itemElem) {
  renderItems(todo.removeItem(itemElem.id));
}

function renderItems(items) {
  if (items.length) {
    elems.items.classList.remove("hidden");
    elems.clear.classList.remove("hidden");
  } else {
    elems.items.classList.add("hidden");
    elems.clear.classList.add("hidden");
  }
  elems.items.innerHTML = items.map(itemTemplate).join("");
  elems.new.text.focus();
}

// ------ init helpers ----
function bindEvents() {
  elems.new.addEventListener("submit", onNewSubmit);
  elems.items.addEventListener("click", onItemsClick);
  elems.items.addEventListener("keypress", onItemsKeyPress);
  elems.clear.addEventListener("click", onClearClick);
}

function getElems() {
  return {
    new: document.querySelector(".new"),
    items: document.querySelector(".todo__items"),
    clear: document.querySelector(".todo__clear"),
  };
}
