import {createListEventsTemplate} from './events.js';

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const createDaysTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

tripEventsElement.insertAdjacentHTML(`beforeend`, createDaysTemplate());

let dayCounter = 0;
export const createDaysItemTemplate = (startDateEvent, listEvents) => {
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

      <ul class="trip-events__list">
      ${createListEventsTemplate(listEvents)}
      </ul>
    </li>`
  );
};
