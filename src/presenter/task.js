import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import {renderHTMLElement, RenderPosition, replace, closeElement} from "../utils/render";

export default class Task {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFormEditTask = this._closeFormEditTask.bind(this);
  }

  init(task) {
    this._task = task;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    renderHTMLElement(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _closeFormEditTask() {
    this._replaceFormToCard();
  }

  _escKeyDownHandler(evt) {
    closeElement.isEscapeEvent(evt, this._closeFormEditTask);
  }


  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
