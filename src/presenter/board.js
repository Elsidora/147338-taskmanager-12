import TaskEditView from "../view/task-edit";
import TaskView from "../view/task";

import SortingView from "../view/sorting";
import ButtonLoadingView from "../view/button-load";

import BoardView from "../view/board";
import TaskListView from "../view/task-list";
import NoTaskView from "../view/no-task";
import {renderHTMLElement, RenderPosition, replace, remove, closeElement} from "../utils/render.js";

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortingView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js

    renderHTMLElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    renderHTMLElement(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    // Метод для рендеринга сортировки

    renderHTMLElement(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTask(task) {
    // Метод, куда уйдёт логика по созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

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

    renderHTMLElement(this._taskListComponent, taskComponent, RenderPosition.BEFOREEND);
  }

  _renderTasks(from, to) {
    // Метод для рендеринга N-задач за раз

    this._boardTasks
      .slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки

    renderHTMLElement(this._boardComponent, this._noTaskComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js

    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new ButtonLoadingView();

    renderHTMLElement(this._boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => this._renderTask(boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= this._boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js

    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
