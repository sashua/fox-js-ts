import { STORAGE_KEY } from "./constants.js";

// ------ API ------
function set(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function get() {
  let value = localStorage.getItem(STORAGE_KEY);
  try {
    value = JSON.parse(value);
  } catch {
    value = [];
  } finally {
    return Array.isArray(value) ? value : [];
  }
}

function remove() {
  localStorage.removeItem(STORAGE_KEY);
}

export default { set, get, remove };
