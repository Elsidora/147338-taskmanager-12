// 3.7 Обучаем шаблон задачи принимать данные

// Вместо статичных данных в шаблоне выводим моковые данные. Начинаем с простых:
// - Цвет карточки
// - Описание
// - Дата. Используем встроенный метод toLocaleString объекта Date для вывода дедлайна в человеческом формате.
// Метод toLocaleString() возвращает строку с языко-зависимым представлением даты. Новые аргументы locales и options
// позволяют приложениям определять язык, чьи соглашения по форматированию должны использоваться, а также менять поведение этого метода.
// - По заданию дата может отсутствовать, учтём это в createCardTaskTemplate


// 3.8 Описываем логику отображения дедлайна

// Если "логике отношений" место в данных, то "логике отображения" - самое место в шаблоне.

// - Опишем функцию, которая будет проверять, просрочена ли задача
// - Используем её для добавления класса-модификатора
import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate} from "../util.js";

// 3.9 Описываем остальную логику отображения

// По аналогии с датой пишем код, который будет добавлять класс-модификатор повторяющейся задаче,
// а также выделять кнопки "Архив" и "В избранное" в соответствии с флагами в данных

export const createCardTaskTemplate = (task) => {
  const {color, description, dueDate, repeating, isArchive, isFavorite} = task;

  const date = dueDate !== null
    ? humanizeTaskDueDate(dueDate)
    : ``; // `numeric` - представление нумерации дней без нуля впереди, `long` - полное название месяца

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  return (`<article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn ${archiveClassName}">
            archive
          </button>
          <button
            type="button"
            class="card__btn ${favoriteClassName}"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`
  );
};
