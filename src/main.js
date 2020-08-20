import SiteMenuView from "./view/site-menu";
import {createFilterTemplate} from "./view/filter.js";
import {createFormEditTaskTemplate} from "./view/form-edit.js";
import {createCardTaskTemplate} from "./view/card.js";

import {createSortingTemplate} from "./view/sorting.js";
import {renderHtmlElementTemplate, renderElement, RenderPosition} from "./util";
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

  renderHtmlElementTemplate(boardElement, createButtonLoadingTemplate(), `beforeend`);
  const loadMoreButton = boardElement.querySelector(`.load-more`);

  const onLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderHtmlElementTemplate(boardTasksElement, createCardTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  };

  renderHtmlElementTemplate(boardTasksElement, createFormEditTaskTemplate(tasks[0]), `beforeend`);

  for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderHtmlElementTemplate(boardTasksElement, createCardTaskTemplate(tasks[i]), `beforeend`);
  }
  // renderHtmlElement(boardElement, createButtonLoadingTemplate(), `beforeend`);

  if (tasks.length > TASK_COUNT_PER_STEP) {
    loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
  }

};

renderElement(siteMainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderHtmlElementTemplate(siteMainElement, createFilterTemplate(filters), `beforeend`);
renderHtmlElementTemplate(siteMainElement, createSortingTemplate(), `beforeend`);
renderBoardElement();
