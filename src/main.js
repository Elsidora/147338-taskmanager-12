import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";

import TaskEditView from "./view/task-edit";
import TaskView from "./view/task";

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
const taskListComponent = new TaskListView();
const loadMoreButtonComponent = new ButtonLoadingView();
let renderedTaskCount = TASK_COUNT_PER_STEP;

const onLoadMoreButtonClick = (evt) => {
  evt.preventDefault();
  tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderElement(taskListComponent.getElement(), new TaskView(task).getElement(), RenderPosition.BEFOREEND));

  if (renderedTaskCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
  renderedTaskCount += TASK_COUNT_PER_STEP;
};

renderElement(siteMainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortingView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
  renderElement(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
if (tasks.length > TASK_COUNT_PER_STEP) {
  loadMoreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
}

