export const renderBoardElement = (count, element, renderFunction, createFunctionOne, createFunctionTwo, createFunctionThree) => {
  const boardElement = element.querySelector(`.board`);
  const boardTasksElement = boardElement.querySelector(`.board__tasks`);
  renderFunction(boardTasksElement, createFunctionOne(), `beforeend`);

  for (let i = 0; i < count; i += 1) {
    renderFunction(boardTasksElement, createFunctionTwo(), `beforeend`);
  }

  renderFunction(boardElement, createFunctionThree(), `beforeend`);
};
