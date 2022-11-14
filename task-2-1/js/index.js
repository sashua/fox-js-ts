import { CSS_COLORS } from "./cssColors.js";

const colorSets = [getRandomHexColor, getRandomRgbColor, getRandomCssColor];
const colorValueEl = document.querySelector(".color__value");
let currentColorSet = 0;

setBackgroundColor("White");

document.querySelector(".button").addEventListener("click", () => {
  const color = colorSets[currentColorSet]();
  setBackgroundColor(color);
  currentColorSet = (currentColorSet + 1) % colorSets.length;
});

function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  colorValueEl.textContent = color;
}

// ---------------------------------------------------------------------------
function getRandomHexColor() {
  return `#${getRandom(255 ** 3 - 1)
    .toString(16)
    .padStart(6, "0")}`;
}

function getRandomRgbColor() {
  return `rgb(${getRandom(255)}, ${getRandom(255)}, ${getRandom(255)})`;
}

function getRandomCssColor() {
  return CSS_COLORS[getRandom(CSS_COLORS.length - 1)];
}

function getRandom(maxValue) {
  return Math.floor(Math.random() * maxValue);
}
