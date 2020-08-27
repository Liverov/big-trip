import {
  getDateInHoursMinutes,
  getEventDuration,
  getfullPriceEvent
} from '../utils.js';

export const createListEventsTemplate = (listEvents) => {
  return listEvents.map((event) => {
    const {eventType, destination, price, offers, startDate, endDate} = event;

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
        </li>`).slice(0, 3).join(``);
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
          €&nbsp;<span class="event__price-value">${getfullPriceEvent(price, offers)}</span>
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
  }).join(``);
};
