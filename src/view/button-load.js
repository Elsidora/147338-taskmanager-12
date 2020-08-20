import {createElement} from "../util";

const createButtonLoadingTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class ButtonLoading {
  constructor() {
    this._element = null; // вызываем конструктор, в котором происходит инициализация приватного свойства _element со значением null
  }

  getTemplate() {
    return createButtonLoadingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
