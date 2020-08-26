import {createTripInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createEditEventTemplate} from './view/edit-event.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createDaysItemTemplate} from './view/days.js';
import {generateEvent} from './mock/event.js';
// import {generateFilter} from './mock/filter.js';
import {getDateInDayMonth} from './utils.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const sortedEvents = events.slice().sort((a, b) => a.startDate - b.startDate);
// const filters = generateFilter(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
const dayElement = siteMainElement.querySelector(`.trip-days`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteTripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(siteControlsElement, createSiteMenuTemplate(), `afterbegin`);
render(siteControlsElement, createFilterTemplate(), `beforeend`);
render(tripEventsElement, createSortTemplate(), `afterbegin`);

let listEvents = [];
for (let i = 0; i < sortedEvents.length - 1; i++) {
  if (getDateInDayMonth(sortedEvents[i].startDate) !== getDateInDayMonth(sortedEvents[i + 1].startDate)) {
    const dayMonth = getDateInDayMonth(sortedEvents[i].startDate);
    const startDateEvent = sortedEvents[i].startDate;
    listEvents = sortedEvents.filter((event) => dayMonth === getDateInDayMonth(event.startDate));

    render(dayElement, createDaysItemTemplate(startDateEvent, listEvents), `beforeend`);
  }
}

const dayEventsElement = dayElement.querySelector(`.trip-events__list`);
render(dayEventsElement, createEditEventTemplate(listEvents[0]), `afterbegin`);
