import TripEvents from '../view/trip-events.js';
import Sort from '../view/sort.js';
import TripDays from '../view/trip-days.js';
import Days from '../view/days.js';
import TripEventsList from '../view/trip-events-list.js';
import AddEditEvent from '../view/edit-event.js';
import Events from '../view/events.js';
import NoEvents from '../view/no-events.js';
import {getDateInDayMonth, sortTime, sortPrice} from '../utils/event.js';
import {renderElement, RenderPosition, replace} from '../utils/render.js';
import {SortType} from "../const.js";

export default class Trip {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._currentSortType = SortType.DEFAULT;

    this._tripEvents = new TripEvents();
    this._sortComponent = new Sort();
    this._tripDays = new TripDays();
    // this._days = new Days();
    this._tripEventsList = new TripEventsList();
    this._addEditEvent = new AddEditEvent();
    // this._eventsComponent = new Events();
    this._noEvents = new NoEvents();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._sortedElement = this._tripDays;
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();

    renderElement(this._mainElement, this._tripEvents, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderNoEvents() {
    renderElement(this._tripEvents, this._noEvents, RenderPosition.AFTERBEGIN);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._events.sort(sortTime);
        break;
      case SortType.PRICE:
        this._events.sort(sortPrice);
        break;
      default:
        this._events = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearListEvents();
    this._renderListEvents();
  }

  _renderSort() {
    renderElement(this._tripEvents, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderDays() {
    renderElement(this._tripEvents, this._tripDays, RenderPosition.BEFOREEND);
  }

  _renderEvents(tripElement, startDateEvent, listEvents) {
    const daysEventsComponent = new Days(startDateEvent);
    const newTripEventsList = new TripEventsList();

    renderElement(tripElement, daysEventsComponent, RenderPosition.BEFOREEND);
    renderElement(daysEventsComponent, newTripEventsList, RenderPosition.BEFOREEND);

    listEvents.map((event) => {
      const eventsComponent = new Events(event);
      const addEditEventComponent = new AddEditEvent(event);

      const replaceCardToForm = () => {
        replace(addEditEventComponent, eventsComponent);
      };

      const replaceFormToCard = () => {
        replace(eventsComponent, addEditEventComponent);
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          replaceFormToCard();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      eventsComponent.setEditClickHandler(() => {
        replaceCardToForm();
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      addEditEventComponent.setFormSubmitHandler(() => {
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      renderElement(newTripEventsList, eventsComponent, RenderPosition.AFTERBEGIN);
    });
  }

  _clearListEvents() {
    this._tripDays.getElement().innerHTML = ``;
  }

  _renderListEvents() {
    let listEvents = [];

    if (this._currentSortType && this._currentSortType !== SortType.EVENT) {
      this._renderEvents(this._tripDays, ``, this._events);
      return;
    }

    for (let i = 0; i < this._events.length; i++) {
      if (getDateInDayMonth(this._events[i].startDate) !== getDateInDayMonth(this._events[i + 1].startDate)) {
        const dayMonth = getDateInDayMonth(this._events[i].startDate);
        const startDateEvent = this._events[i].startDate;
        listEvents = this._events.filter((event) => dayMonth === getDateInDayMonth(event.startDate));
        this._renderEvents(this._tripDays, startDateEvent, listEvents);
      }
    }
  }

  _renderBoard() {
    if (this._events.every((event) => event.length === 0)) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderDays();
    this._renderListEvents();
  }
}
