import stickerTemplate from "../templates/stickerTemplate.js";

export function addSticker(element, text) {
  const sticker = element.querySelector(".js-sticker");
  if (sticker) {
    sticker.outerHTML = stickerTemplate({ text });
  } else {
    element.insertAdjacentHTML("beforeend", stickerTemplate({ text }));
  }
}
