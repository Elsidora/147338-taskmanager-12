import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFormEditTaskTemplate} from "./view/form-edit.js";
import {createCardTaskTemplate} from "./view/card.js";

import {createSortingTemplate} from "./view/sorting.js";
import {renderHtmlElement} from "./util.js";
import {createButtonLoadingTemplate} from "./view/button-load.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;


const tasks = new Array(TASK_COUNT).fill().map(generateTask); // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением
// (в данном случае - undefined). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

const filters = generateFilter(tasks);
const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);


const renderBoardElement = () => {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  const boardElement = siteMainElement.querySelector(`.board`);
  const boardTasksElement = boardElement.querySelector(`.board__tasks`);

  renderHtmlElement(boardElement, createButtonLoadingTemplate(), `beforeend`);
  const loadMoreButton = boardElement.querySelector(`.load-more`);

  const onLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderHtmlElement(boardTasksElement, createCardTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  };

  renderHtmlElement(boardTasksElement, createFormEditTaskTemplate(tasks[0]), `beforeend`);

  for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderHtmlElement(boardTasksElement, createCardTaskTemplate(tasks[i]), `beforeend`);
  }
  // renderHtmlElement(boardElement, createButtonLoadingTemplate(), `beforeend`);

  if (tasks.length > TASK_COUNT_PER_STEP) {
    loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
  }

};

renderHtmlElement(siteMainControlElement, createSiteMenuTemplate(), `beforeend`); // beforeend вставляет последним дочерним элементом контейнера
renderHtmlElement(siteMainElement, createFilterTemplate(filters), `beforeend`);
renderHtmlElement(siteMainElement, createSortingTemplate(), `beforeend`);
renderBoardElement();
