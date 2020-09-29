import AbstractView from '../abstract.js';

const createEventsTripListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsTripList extends AbstractView {
  getTemplate() {
    return createEventsTripListTemplate();
  }
}
