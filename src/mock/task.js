// Функция генерации случайного числа из диапазона

const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `завершить успешно проект`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

// - Опишем функцию для генерации даты. По заданию это либо null, либо дата плюс-минус неделя от текущей
// - Для удобства генерации заведем вспомогательную функцию getRandomInteger
// - Сгенерируем дату в итоговом объекте с моками

const generateDate = () => {
  // Ноль - ложь, один - истина. Для верности приводим
  // к булевому типу с помощью Boolean
  const isDate = Boolean(getRandomInteger(0, 1));

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

export const generateTask = () => {
  const dueDate = generateDate();
  return {
    description: generateDescription(),
    dueDate,
    isRepeat: false,
    repeating: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: `black`,
    isArchive: false,
    isFavorite: false,
  };
};
