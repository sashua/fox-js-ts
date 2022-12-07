function stickerTemplate({ text }) {
  return text
    ? `
      <span class="icon-button__sticker js-sticker">${text}</span>
      `
    : "";
}

export default stickerTemplate;
