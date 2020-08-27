const eventsFiltersMap = {
  everything: (events) => events,
  future: (events) => events.filter((event) => event.startDate > new Date()),
  past: (events) => events.filter((event) => event.endDate < new Date())
};

export const generateFilter = (events) => {
  return Object.entries(eventsFiltersMap).map(([filterName, filterEvents]) => {
    return {
      name: filterName,
      filteredEvents: filterEvents(events)
    };
  });
};
