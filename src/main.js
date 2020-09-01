import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import TripEvents from './view/trip-events.js';
import Sort from './view/sort.js';
import TripDays from './view/trip-days.js';
import Days from './view/days.js';
import TripEventsList from './view/trip-events-list.js';
import AddEditEvent from './view/edit-event.js';
import {generateEvent} from './mock/event.js';
// import {generateFilter} from './mock/filter.js';
import {getDateInDayMonth, renderElement, RenderPosition} from './utils.js';
import Events from './view/events.js';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
const sortedEvents = events.slice().sort((a, b) => a.startDate - b.startDate);
// const filters = generateFilter(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main`);

renderElement(siteTripInfoElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new SiteMenu().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new Filter().getElement(), RenderPosition.BEFOREEND);

const tripEventsComponent = new TripEvents();
renderElement(siteMainElement, tripEventsComponent.getElement(), RenderPosition.BEFOREEND);
const tripSortComponent = new Sort();
renderElement(tripEventsComponent.getElement(), tripSortComponent.getElement(), RenderPosition.BEFOREEND);
const tripDaysComponent = new TripDays();
renderElement(tripEventsComponent.getElement(), tripDaysComponent.getElement(), RenderPosition.BEFOREEND);


const renderEvents = (tripElement, startDateEvent, listEvents) => {
  const daysEventsComponent = new Days(startDateEvent);
  renderElement(tripElement, daysEventsComponent.getElement(), RenderPosition.BEFOREEND);

  const tripEventsListComponent = new TripEventsList();
  renderElement(daysEventsComponent.getElement(), tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);

  listEvents.map((event) => {
    const eventsComponent = new Events(event);
    const addEditEventComponent = new AddEditEvent(event);

    const replaceCardToForm = () => {
      tripEventsListComponent.getElement().replaceChild(addEditEventComponent.getElement(), eventsComponent.getElement());
    };

    const replaceFormToCard = () => {
      tripEventsListComponent.getElement().replaceChild(eventsComponent.getElement(), addEditEventComponent.getElement());
    };

    eventsComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replaceCardToForm();
    });

    addEditEventComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
    });

    renderElement(tripEventsListComponent.getElement(), eventsComponent.getElement(), RenderPosition.AFTERBEGIN);
  });
};

let listEvents = [];
for (let i = 0; i < sortedEvents.length - 1; i++) {
  if (getDateInDayMonth(sortedEvents[i].startDate) !== getDateInDayMonth(sortedEvents[i + 1].startDate)) {
    const dayMonth = getDateInDayMonth(sortedEvents[i].startDate);
    const startDateEvent = sortedEvents[i].startDate;
    listEvents = sortedEvents.filter((event) => dayMonth === getDateInDayMonth(event.startDate));
    renderEvents(tripDaysComponent.getElement(), startDateEvent, listEvents);
  }
}
