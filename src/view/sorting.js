import {createElement} from "../util";

const createSortingTemplate = () => {
  return (
    `<div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>`
  );
};

export default class Sorting {
  constructor() {
    this._element = null; // вызываем конструктор, в котором происходит инициализация приватного свойства _element со значением null
  }

  getTemplate() {
    return createSortingTemplate();
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
