import {tripInfo} from './view/trip-info.js';
import {siteMenu} from './view/site-menu.js';
import {addFirstEvent} from './view/add-first-event.js';
import {filter} from './view/filter.js';
import {sort} from './view/sort.js';
import {days} from './view/days.js';
import {daysEvents} from './view/days-events.js';

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

render(siteTripInfoElement, tripInfo(), `afterbegin`);
render(siteControlsElement, siteMenu(), `afterbegin`);
render(siteControlsElement, filter(), `beforeend`);
render(tripEventsElement, addFirstEvent(), `afterbegin`);
render(tripEventsElement, sort(), `beforeend`);

const tripDaysElement = siteMainElement.querySelector(`.trip-days`);

for (let i = 0; i < DAYS_COUNT; i++) {
  render(tripDaysElement, days(), `afterbegin`);

  const tripDaysEventsListElement = tripDaysElement.querySelector(`.trip-events__list`);

  for (let j = 0; j < EVENTS_COUNT; j++) {
    render(tripDaysEventsListElement, daysEvents(), `afterbegin`);
  }
}
