import SiteMenuView from "./view/site-menu";
import FilterView from "./view/filter";

import TaskEditView from "./view/task-edit";
import TaskView from "./view/task";

import SortingView from "./view/sorting";
import ButtonLoadingView from "./view/button-load";

import BoardView from "./view/board";
import TaskListView from "./view/task-list";
import NoTaskView from "./view/no-task";

import {generateTask} from "./mock/task";
import {generateFilter} from "./mock/filter";
import {renderHTMLElement, RenderPosition, replace, remove, closeElement} from "./utils/render";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask); // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением
// (в данном случае - undefined). Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  const closeFormEditTask = () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscapePress);
  };

  const onEscapePress = (evt) => {
    closeElement.isEscapeEvent(evt, closeFormEditTask);
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscapePress);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    closeFormEditTask();
  });

  // taskEditComponent.getElement().querySelector(`form`).addEventListener(`keydown`, onEscapePress);

  renderHTMLElement(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {

  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();
  const loadMoreButtonComponent = new ButtonLoadingView();
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const onLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    if (renderedTaskCount >= boardTasks.length) {
      remove(loadMoreButtonComponent);
    }
    boardTasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

    renderedTaskCount += TASK_COUNT_PER_STEP;
  };

  renderHTMLElement(boardContainer, boardComponent, RenderPosition.BEFOREEND);
  if (boardTasks.every((boardTask) => boardTask.isArchive)) {
    renderHTMLElement(boardComponent, new NoTaskView(), RenderPosition.AFTERBEGIN);
    return;
  }
  renderHTMLElement(boardComponent, new SortingView(), RenderPosition.AFTERBEGIN);
  renderHTMLElement(boardComponent, taskListComponent, RenderPosition.BEFOREEND);
  for (let i = 0; i < Math.min(boardTasks.length, TASK_COUNT_PER_STEP); i += 1) {
    renderTask(taskListComponent, boardTasks[i]);
  }

  renderHTMLElement(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);
  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    loadMoreButtonComponent.setClickHandler(onLoadMoreButtonClick);
  }
};

renderHTMLElement(siteMainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND); // beforeend вставляет последним дочерним элементом контейнера
renderHTMLElement(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
