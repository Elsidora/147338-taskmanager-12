import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";

import {createFormEditTaskTemplate} from "./view/task-edit.js";
import {createCardTaskTemplate} from "./view/task.js";

import SortingView from "./view/sorting";
import ButtonLoadingView from "./view/button-load";

import BoardView from "./view/board";
import TaskListView from "./view/task-list";

import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderTemplate, renderElement, RenderPosition} from "./util";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask); // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением
// (в данном случае - undefined). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const boardComponent = new BoardView();
renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortingView().getElement(), RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
renderTemplate(taskListComponent.getElement(), createFormEditTaskTemplate(tasks[0]), RenderPosition.BEFOREEND);

const loadMoreButtonComponent = new ButtonLoadingView();
renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
  renderTemplate(taskListComponent.getElement(), createCardTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  loadMoreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
}

const onLoadMoreButtonClick = (evt) => {
  evt.preventDefault();
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTemplate(taskListComponent.getElement(), createCardTaskTemplate(task), `beforeend`));

  renderedTaskCount += TASK_COUNT_PER_STEP;

  if (renderedTaskCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
};

renderElement(siteMainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
