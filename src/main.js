import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFormEditTaskTemplate} from "./view/form-edit.js";
import {createCardTaskTemplate} from "./view/card.js";

import {createSortingTemplate} from "./view/sorting.js";
import {renderHtmlElement} from "./view/render.js";
import {renderBoardElement} from "./view/board.js";
import {createButtonLoadingTemplate} from "./view/button-load.js";

const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

renderHtmlElement(siteMainControlElement, createSiteMenuTemplate(), `beforeend`); // beforeend вставляет последним дочерним элементом контейнера

renderHtmlElement(siteMainElement, createFilterTemplate(), `beforeend`);
renderHtmlElement(siteMainElement, createSortingTemplate(), `beforeend`);

renderBoardElement(TASK_COUNT, siteMainElement, renderHtmlElement, createFormEditTaskTemplate, createCardTaskTemplate, createButtonLoadingTemplate);
