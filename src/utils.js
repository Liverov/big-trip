export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforened`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getDateToFullFormat = (humanDate) => {
  return humanDate.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `numeric`});
};

export const getDateInHoursMinutes = (date) => {
  return date.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`});
};

export const getDateInDayMonth = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`});
};

export const getEventDuration = (startDate, endDate) => {
  const firstDate = startDate.getTime();
  const secondDate = endDate.getTime();
  const diffMs = (secondDate - firstDate);
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = (Math.floor(totalHours / 24));
  const minutes = (totalMinutes % 60);
  const hours = (totalHours % 24);
  return {
    days,
    minutes,
    hours
  };
};

export const getfullPriceEvent = (price, offers) => {
  let fullPrice = price;
  offers.filter((obj) => obj.isActive).map((obj) => {
    fullPrice += obj.cost;
  });
  return fullPrice;
};
