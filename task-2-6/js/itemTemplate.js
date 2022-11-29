export const itemTemplate = ({ id, text }) => `
  <li id="${id}" class="item">
    <p class="item__text" contenteditable="false">
      ${text}
    </p>
    <div class="item__controls">
      <button
        class="item__button item__button--edit"
        type="button"
        aria-label="Edit"
        data-action="edit"
      >
        <svg width="16" height="16">
          <use class="item__svg--edit" href="./img/icons.svg#pen-to-square"></use>
          <use class="item__svg--save" href="./img/icons.svg#square-check"></use>
        </svg>
      </button>
      <button
        class="item__button item__button--delete"
        type="button"
        aria-label="Delete"
        data-action="delete"
      >
        <svg width="16" height="16">
          <use href="./img/icons.svg#trash-can"></use>
        </svg>
      </button>
    </div>
  </li>
`;
