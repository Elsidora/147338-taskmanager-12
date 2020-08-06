import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFormEditTaskTemplate} from "./view/form-edit.js";
import {createCardTaskTemplate} from "./view/card.js";

import {createSortingTemplate} from "./view/sorting.js";
import {renderHtmlElement} from "./util.js";
import {createButtonLoadingTemplate} from "./view/button-load.js";
import {generateTask} from "./mock/task.js";


const TASK_COUNT = 4;

const tasks = new Array(TASK_COUNT).fill().map(generateTask); // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением
// (в данном случае - undefined). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const renderBoardElement = () => {
  const boardElement = siteMainElement.querySelector(`.board`);
  const boardTasksElement = boardElement.querySelector(`.board__tasks`);
  renderHtmlElement(boardTasksElement, createFormEditTaskTemplate(), `beforeend`);

  for (let i = 1; i < TASK_COUNT; i += 1) {
    renderHtmlElement(boardTasksElement, createCardTaskTemplate(tasks[0]), `beforeend`);
  }

  renderHtmlElement(boardElement, createButtonLoadingTemplate(), `beforeend`);
};

renderHtmlElement(siteMainControlElement, createSiteMenuTemplate(), `beforeend`); // beforeend вставляет последним дочерним элементом контейнера
renderHtmlElement(siteMainElement, createFilterTemplate(), `beforeend`);
renderHtmlElement(siteMainElement, createSortingTemplate(), `beforeend`);
renderBoardElement();
