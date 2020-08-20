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
import {renderHTMLElement, RenderPosition} from "./util";

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

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  renderHTMLElement(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

let renderedTaskCount = TASK_COUNT_PER_STEP;

const onLoadMoreButtonClick = (evt) => {
  evt.preventDefault();
  tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTask(taskListComponent.getElement(), task));

  if (renderedTaskCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
  renderedTaskCount += TASK_COUNT_PER_STEP;
};

renderHTMLElement(siteMainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderHTMLElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderHTMLElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
renderHTMLElement(boardComponent.getElement(), new SortingView().getElement(), RenderPosition.AFTERBEGIN);
renderHTMLElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);


for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i += 1) {
  renderTask(taskListComponent.getElement(), tasks[i]);
}

renderHTMLElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
if (tasks.length > TASK_COUNT_PER_STEP) {
  loadMoreButtonComponent.getElement().addEventListener(`click`, onLoadMoreButtonClick);
}

