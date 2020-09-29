import AbstractView from '../abstract.js';

const createEventsDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventsDays extends AbstractView {
  getTemplate() {
    return createEventsDaysTemplate();
  }
}
