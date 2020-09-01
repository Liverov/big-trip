import {createElement} from '../utils.js';
// import Events from './events.js';

// const siteMainElement = document.querySelector(`.page-main`);
// const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

// const createDaysTemplate = () => {
//   return (`<ul class="trip-days"></ul>`);
// };

// tripEventsElement.insertAdjacentHTML(`beforeend`, createDaysTemplate());

let dayCounter = 0;
const createDaysItemTemplate = (startDateEvent) => {
  dayCounter++;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="2019-03-18">
        ${startDateEvent.toLocaleString(`EN-GB`, {month: `short`})} 
        ${startDateEvent.toLocaleString(`EN-GB`, {day: `numeric`})}
        </time>
      </div>
    </li>`
  );
};

export default class Days {
  constructor(startDate) {
    this._startDate = startDate;
    this._element = null;
  }

  getTemplate() {
    return createDaysItemTemplate(this._startDate);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
