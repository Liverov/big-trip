import {createTripInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {addFirstEventTemaplte} from './view/add-first-event.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createDaysItemTemplate} from './view/days.js';
import {createDaysEventsTemplate} from './view/days-events.js';

const DAYS_COUNT = 3;
const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteTripInfoElement, createTripInfoTemplate(), `afterbegin`);
render(siteControlsElement, createSiteMenuTemplate(), `afterbegin`);
render(siteControlsElement, createFilterTemplate(), `beforeend`);
render(tripEventsElement, addFirstEventTemaplte(), `afterbegin`);
render(tripEventsElement, createSortTemplate(), `beforeend`);

const tripDaysElement = siteMainElement.querySelector(`.trip-days`);

for (let i = 0; i < DAYS_COUNT; i++) {
  render(tripDaysElement, createDaysItemTemplate(), `afterbegin`);

  const tripDaysEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);

  for (let j = 0; j < EVENTS_COUNT; j++) {
    render(tripDaysEventsListElement, createDaysEventsTemplate(), `afterbegin`);
  }
}
