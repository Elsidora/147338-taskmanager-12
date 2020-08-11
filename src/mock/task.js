import {COLORS} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {getRandomInteger} from "../util.js";
import {getRandomBoolean} from "../util.js";

const generateDescription = () => {

  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

// - Опишем функцию для генерации даты. По заданию это либо null, либо дата плюс-минус неделя от текущей
// - Для удобства генерации заведем вспомогательную функцию getRandomInteger
// - Сгенерируем дату в итоговом объекте с моками

const generateDate = () => {
  // Ноль - ложь, один - истина. Для верности приводим
  // к булевому типу с помощью Boolean
  const isDate = getRandomBoolean();
  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7; // максимальный разрыв от текущей даты
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap); // плюс-минус неделя от текущей даты (рандомный разрыв)
  const currentDate = new Date(); // текущая дата

  // По заданию дедлайн у задачи устанавливается без учёта времеми,
  // но объект даты без времени завести нельзя,
  // поэтому будем считать срок у всех задач -
  // это 23:59:59 установленной даты
  currentDate.setHours(23, 59, 59, 999);
  // Метод setHours() устанавливает часы указанной даты по местному времени
  // и возвращает количество миллисекунд, прошедших с 1 января 1970 00:00:00 по UTC до времени, представляемого обновлённым экземпляром Date.
  // параметры: часы, минуты, секунды, миллисекунды.

  currentDate.setDate(currentDate.getDate() + daysGap); // Метод setDate() устанавливает день месяца указанной даты по местному времени.
  // Метод getDate() возвращает день месяца указанной даты по местному времени (целое число от 1 до 31)

  return new Date(currentDate);
};

// - Опишем функцию для генерации дней повторения
// - Дни повторения будем выбирать случайно из двух - среды и пятницы

// N.B. Если рандомизировать абсолютно все дни, такие данные не будут
// похожи на реальные, потому что из семи случайных булевых значений почти каждый раз
// будет хоть одно истинное, а значит почти все задачи будут повторяющимися

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: getRandomBoolean(),
    th: false,
    fr: getRandomBoolean(),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();

  // По заданию задача с дедлайном не может быть повторяющейся, таким знаниям
  // самое место в данных, и никак не в шаблоне:
  // - Опишем условие, что если дата отсутствует, т.е. задача не с дедлайном, то нужно генерировать дни повторения
  // - В противном случае - не нужно, все дни false
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };
  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};
