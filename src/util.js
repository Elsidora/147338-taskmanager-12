export const renderHtmlElement = (container, markupString, position) => {
  container.insertAdjacentHTML(position, markupString);
};

// Функция генерации случайного числа из диапазона

export const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => Math.random() >= 0.5;

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};


export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dueDate;
};

export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() === dueDate;
};


export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some((it) => it);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};
