import {COLORS, DESCRIPTIONS} from "../const";
import {getRandomInteger, getRandomBoolean} from "../utils/common";

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода необходимо использовать что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  return DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
};

// - Опишем функцию для генерации даты. По заданию это либо null, либо дата плюс-минус неделя от текущей
// - Для удобства генерации заведем вспомогательную функцию getRandomInteger
// - Сгенерируем дату в итоговом объекте с моками

const generateDate = () => {

  const maxDaysGap = 7;
  const currentDate = new Date();

  return getRandomBoolean() ? currentDate.setDate(currentDate.getDate() + getRandomInteger(-maxDaysGap, maxDaysGap)) : null;
};

const generateRepeating = (dueDate = null) => {
  return {
    mo: false,
    tu: false,
    we: dueDate === null ? getRandomBoolean() : false,
    th: false,
    fr: dueDate === null ? getRandomBoolean() : false,
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  return COLORS[getRandomInteger(0, COLORS.length - 1)];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = generateRepeating(dueDate);

  return {
    id: generateId(),
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};
