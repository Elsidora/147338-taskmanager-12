export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }
}


/* Абстрактный класс нужен, чтобы в одном месте описать общую логику наших компонентов, а после переиспользовать ее благодаря наследованию

N.B. Проверка в конструкторе на "new.target" позволит использовать абстрактный
класс только в качестве родительского класса. При попытке выполнить "new Abstract()" разработчик получит ошибку
*/
