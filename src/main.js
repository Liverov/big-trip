import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import EventsFilters from './view/events/events-filters.js';

import TripPresenter from './presenter/trip.js';
import {generateEvent} from './mock/event.js';
import {renderElement, RenderPosition} from './utils/render.js';

const EVENTS_COUNT = 23;

// Array.fill - копирование массива в ES6
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort((a, b) => a.startDate - b.startDate);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main > .page-body__container > .trip-events`);

const tripPresenter = new TripPresenter(siteMainElement);

// renderElement(куда, что, начало/конец)
// getElement() метод Abstract вызывающий createElement(this.getTemplate) метод Render который создает элемент.
// this.getTemplate вызывается в контексте new SiteMenu, т.е SiteMenu.getTemaplte
renderElement(siteTripInfoElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new SiteMenu().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new EventsFilters().getElement(), RenderPosition.BEFOREEND);

tripPresenter.init(events);

