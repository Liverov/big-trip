import {
  getDateInHoursMinutes,
  getEventDuration
} from '../utils/event.js';
import AbstractView from './abstract.js';

const createListEventsTemplate = (event) => {

  const OFFERS_LIMIT = 3;

  const {
    eventType,
    destination,
    price,
    offers,
    startDate,
    endDate
  } = event;

  const showEventDuration = () => {
    const eventDuration = getEventDuration(startDate, endDate);
    let eventDurationString = eventDuration.minutes + `M`;
    if (eventDuration.hours) {
      eventDurationString = eventDuration.hours + `H ` + eventDuration.minutes + `M`;
    }
    if (eventDuration.days) {
      eventDurationString = eventDuration.days + `D ` + eventDuration.hours + `H ` + eventDuration.minutes + `M`;
    }
    return eventDurationString;
  };

  const showShortEventOffers = () => {
    return offers.filter((offer) => offer.isActive).map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
          +
          €&nbsp;<span class="event__offer-price">${offer.cost}</span>
      </li>`).slice(0, OFFERS_LIMIT).join(``);
  };

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${eventType.icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">
      ${eventType.name} 
      ${eventType.waypointType !== `Transfer` ? `in` : `to`} 
      ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${getDateInHoursMinutes(startDate)}</time>
          —
          <time class="event__end-time" datetime="2019-03-18T11:00">${getDateInHoursMinutes(endDate)}</time>
        </p>
        <p class="event__duration">${showEventDuration()}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${showShortEventOffers()}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Events extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createListEventsTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
