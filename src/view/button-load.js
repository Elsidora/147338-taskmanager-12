import AbstractView from "./abstract";


const createButtonLoadingTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class ButtonLoading extends AbstractView {

  getTemplate() {
    return createButtonLoadingTemplate();
  }

}
