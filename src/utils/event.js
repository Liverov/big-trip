export const getDateToFullFormat = (humanDate) => {
  return humanDate.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`, year: `2-digit`, hour: `numeric`, minute: `numeric`});
};

export const getDateHoursMinutes = (date) => {
  return date.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`});
};

export const getDateDayMonth = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `numeric`});
};

export const getDateDayShortMonth = (date) => {
  return date.toLocaleString(`en-GB`, {month: `short`, day: `numeric`});
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
    hours,
    diffMs
  };
};

export const getfullPriceEvent = (price, offers) => {
  let fullPrice = price;
  offers.filter((obj) => obj.isActive).map((obj) => {
    fullPrice += obj.cost;
  });
  return fullPrice;
};

export const sortTime = (dateA, dateB) => {
  return getEventDuration(dateA.startDate, dateA.endDate).diffMs - getEventDuration(dateB.startDate, dateB.endDate).diffMs;
};

export const sortPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};
