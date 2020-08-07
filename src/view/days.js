const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

tripEventsElement.insertAdjacentHTML(`beforeend`, createDaysTemplate());

export const createDaysItemTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
