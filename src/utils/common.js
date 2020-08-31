// Функция генерации случайного числа из диапазона

export const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => Math.random() >= 0.5;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

