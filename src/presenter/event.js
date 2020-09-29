import EventsList from '../view/events/events-list.js';
import EventsEditAdd from '../view/events/events-editadd.js';

import {renderElement, RenderPosition, replace, remove} from '../utils/render.js';

export default class Event {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventListComponent = null;
    this._eventsEditAddComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventListComponent = this._eventListComponent;
    const prevEventsEditAddComponent = this._eventsEditAddComponent;

    this._eventListComponent = new EventsList(event);
    this._eventsEditAddComponent = new EventsEditAdd(event);

    this._eventListComponent.setEditClickHandler(this._handleEditClick);
    this._eventsEditAddComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventsEditAddComponent.setFormSubmitHandler(this._handleFormSubmit);

    // Определяем первый раз вызвали init или нет, если нет то в this._eventListComponent что-то будет
    if (prevEventListComponent === null || prevEventsEditAddComponent === null) {
      renderElement(this._eventListContainer, this._eventListComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    // Метод Node.contains() возвращает Boolean значение, указывающее, является ли узел потомком
    // данного узла, т. е. сам узел, один из его прямых потомков ( childNodes ), один из детей его детей и так далее.
    if (this._eventListContainer.getElement().contains(prevEventListComponent.getElement())) {
      replace(this._eventListComponent, prevEventListComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEventsEditAddComponent.getElement())) {
      replace(this._eventsEditAddComponent, prevEventsEditAddComponent);
    }

    remove(prevEventListComponent);
    remove(prevEventsEditAddComponent);
  }

  destroy() {
    remove(this._eventListComponent);
    remove(this._eventsEditAddComponent);
  }

  _replaceCardToForm() {
    replace(this._eventsEditAddComponent, this._eventListComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._eventListComponent, this._eventsEditAddComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    // Метод Object.assign() используется для копирования значений всех собственных
    // перечисляемых свойств из одного или более исходных объектов в целевой объект.
    this._changeData(Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite
        })
    );
  }

  _handleFormSubmit(event) {
    this._changeData(event);
  }
}
