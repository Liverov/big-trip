import AddEditEvent from '../view/edit-event.js';
import {renderElement, RenderPosition, replace} from '../utils/render.js';

class Event {
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
