import NoEvents from '../view/events/no-events.js';
import EventsSort from '../view/events/events-sort.js';
import EventsDays from '../view/events/events-days.js';
import EventsDaysList from '../view/events/events-days-list.js';
import EventsTripList from '../view/events/events-triplist.js';


import EventPresenter from './event.js';

import {getDateDayShortMonth, sortTime, sortPrice} from '../utils/event.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from "../const.js";

export default class Trip {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._currentSortType = SortType.DEFAULT;
    this._eventPresenter = {}; // Observer1: Реализуем Observer, тут будут храниться презентеры евентов.

    this._noEventsComponent = new NoEvents();
    this._eventsSortComponent = new EventsSort();
    this._eventsDaysComponent = new EventsDays();
    this._eventsTripListComponent = new EventsTripList();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._originalEvents = events.slice();

    this._renderBoard();
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._originalEvents = updateItem(this._originalEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _renderNoEvents() {
    renderElement(this._mainElement, this._noEventsComponent, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    if (this._events.every((event) => event.length === 0)) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsDays();
    this._renderEventsList();
  }

  _renderSort() {
    renderElement(this._mainElement, this._eventsSortComponent, RenderPosition.BEFOREEND);
    this._eventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
        this._events = this._originalEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearListEvents();
    this._renderEventsList();
  }

  _clearListEvents() {
    Object.values(this._eventPresenter).forEach((event) => event.destroy());
    this._eventPresenter = {};
  }

  _renderEventsDays() {
    renderElement(this._mainElement, this._eventsDaysComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    if (this._currentSortType && this._currentSortType !== SortType.EVENT) {
      this._renderEvents(this._eventsDaysComponent, ``, this._events);
      return;
    }

    const uniqueDays = [...new Set(this._events.map((event) => getDateDayShortMonth(event.startDate)))];
    uniqueDays.map((dayMonth) => {
      const listEvents = this._events.filter((event) => dayMonth === getDateDayShortMonth(event.startDate));
      this._renderEvents(this._eventsDaysComponent, dayMonth, listEvents);
    });

  }

  _renderEvents(eventsDaysComponent, dayMonth, listEvents) {
    const eventsDayListComponent = new EventsDaysList(dayMonth);
    renderElement(eventsDaysComponent, eventsDayListComponent, RenderPosition.BEFOREEND);

    const eventsTripListComponent = new EventsTripList();
    renderElement(eventsDayListComponent, eventsTripListComponent, RenderPosition.BEFOREEND);

    listEvents.map((event) => {
      const eventPresenter = new EventPresenter(eventsTripListComponent, this._handleEventChange);
      eventPresenter.init(event);
      this._eventPresenter[event.id] = eventPresenter; // Observer2 - Записываем в объект презентер с ключем id и значением сам презентер
      // Благодаря этому в Трип презентере есть объект _eventPresenter который помнит все презентеры
    });
  }
}
