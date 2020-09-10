import TripInfo from './view/trip-info.js';
import SiteMenu from './view/site-menu.js';
import Filter from './view/filter.js';
import BoardPresenter from "./presenter/Trip.js";
import {generateEvent} from './mock/event.js';
// import {generateFilter} from './mock/filter.js';
import {
  renderElement,
  RenderPosition
} from './utils/render.js';

const EVENTS_COUNT = 23;

const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort((a, b) => a.startDate - b.startDate);
// const filters = generateFilter(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripInfoElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main > .page-body__container`);

const boardPresenter = new BoardPresenter(siteMainElement);

renderElement(siteTripInfoElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new SiteMenu().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteControlsElement, new Filter().getElement(), RenderPosition.BEFOREEND);

boardPresenter.init(events);
