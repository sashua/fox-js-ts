import { getCookie, setCookie, deleteCookie } from "./cookies.js";

const COOKIE_NAME = "todo";
const COOKIE_AGE = 24 * 3600;

export function addItem(text) {
  const items = [...getAll(), { id: generateId(), text }];
  setCookie(COOKIE_NAME, JSON.stringify(items), { "max-age": COOKIE_AGE });
  return items;
}

export function changeItem(id, text) {
  const items = getAll().map((item) => ({
    id: item.id,
    text: item.id === id ? text : item.text,
  }));
  setCookie(COOKIE_NAME, JSON.stringify(items), { "max-age": COOKIE_AGE });
  return items;
}

export function getAll() {
  let items;
  try {
    items = JSON.parse(getCookie(COOKIE_NAME));
  } catch (err) {
    console.log(
      `${new Date().toUTCString()} - Cookies contains an invalid value`
    );
  } finally {
    return items ?? [];
  }
}

export function removeItem(id) {
  const items = getAll().filter((item) => item.id !== id);
  setCookie(COOKIE_NAME, JSON.stringify(items), { "max-age": COOKIE_AGE });
  return items;
}

export function clearAll() {
  deleteCookie(COOKIE_NAME);
  return [];
}

function generateId() {
  return String(Date.now());
}
