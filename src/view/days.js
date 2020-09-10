import AbstractView from './abstract.js';

let dayCounter = 0;

const createDaysItemTemplate = (startDateEvent) => {

  dayCounter = (startDateEvent) ? dayCounter + 1 : 0;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${(startDateEvent) ? dayCounter : ``}</span>
        <time class="day__date" datetime="2019-03-18">
        ${startDateEvent.toLocaleString(`EN-GB`, {month: `short`})} 
        ${startDateEvent.toLocaleString(`EN-GB`, {day: `numeric`})}
        </time>
      </div>
    </li>`
  );
};

export default class Days extends AbstractView {
  constructor(startDate) {
    super();
    this._startDate = startDate;
  }

  getTemplate() {
    return createDaysItemTemplate(this._startDate);
  }
}
