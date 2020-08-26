import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";

import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";

import BoardPresenter from "./presenter/board";
import {renderHTMLElement, RenderPosition} from "./utils/render";

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask); // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением
// (в данном случае - undefined). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

renderHTMLElement(siteMainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderHTMLElement(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
