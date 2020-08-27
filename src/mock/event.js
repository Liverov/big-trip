import {getRandomInt} from '../utils.js';

const MAX_RANDOM_DESCRIPTION = 4;
const MAX_RANDOM_PHOTOS = 5;

const waypointTypes = [
  {
    name: `Taxi`,
    icon: `img/icons/taxi.png`,
    waypointType: `Transfer`
  },
  {
    name: `Bus`,
    icon: `img/icons/bus.png`,
    waypointType: `Transfer`
  },
  {
    name: `Train`,
    icon: `img/icons/train.png`,
    waypointType: `Transfer`
  },
  {
    name: `Ship`,
    icon: `img/icons/ship.png`,
    waypointType: `Transfer`
  },
  {
    name: `Transport`,
    icon: `img/icons/Transport.png`,
    waypointType: `Transfer`
  },
  {
    name: `Drive`,
    icon: `img/icons/drive.png`,
    waypointType: `Transfer`
  },
  {
    name: `Flight`,
    icon: `img/icons/flight.png`,
    waypointType: `Transfer`
  },
  {
    name: `Check`,
    icon: `img/icons/check-in.png`,
    waypointType: `Activity`
  },
  {
    name: `Sightseeing`,
    icon: `img/icons/sightseeing.png`,
    waypointType: `Activity`
  },
  {
    name: `Restaurant`,
    icon: `img/icons/restaurant.png`,
    waypointType: `Activity`
  }
];

const waypointDestinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint-Petersburg`
];

const waypointOffers = [
  {
    types: [`Sightseeing`],
    name: `Lunch in city`,
    shortName: `lunch`,
    cost: 30,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Transfer`, `Ship`, `Flight`],
    name: `Buy ticket`,
    shortName: `ticket`,
    cost: 10,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Sightseeing`],
    name: `Book tickets`,
    shortName: `book`,
    cost: 40,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Check`, `Restaurant`],
    name: `Add breakfast`,
    shortName: `breakfast`,
    cost: 50,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Drive`],
    name: `Rent a car`,
    shortName: `rent`,
    cost: 200,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Taxi`],
    name: `Order uber`,
    shortName: `uber`,
    cost: 20,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Flight`, `Ship`],
    name: `Add luggage`,
    shortName: `luggage`,
    cost: 30,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Flight`, `Ship`],
    name: `Switch to comfort class`,
    shortName: `comfort`,
    cost: 100,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Flight`, `Ship`, `Train`, `Bus`],
    name: `Add meal`,
    shortName: `meal`,
    cost: 15,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Flight`, `Ship`, `Train`, `Bus`],
    name: `Choose seats`,
    shortName: `seats`,
    cost: 5,
    isActive: Boolean(getRandomInt(0, 1))
  },
  {
    types: [`Flignt`],
    name: `Travel by train`,
    shortName: `train`,
    cost: 40,
    isActive: Boolean(getRandomInt(0, 1))
  }
];

const generateRandomData = (data) => {
  const randomIndex = getRandomInt(0, data.length - 1);
  return data[randomIndex];
};

const generateOffers = (typeName) => {
  let newOffers = [];
  Object.values(waypointOffers).map((key) => {
    if (key.types.includes(typeName)) {
      newOffers.push(key);
    }
  });
  return newOffers;
};

const generateDescription = () => {
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const separatedDescription = description.split(`.`);
  const shuffleDescription = separatedDescription.sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_DESCRIPTION).join(`.`);
  return shuffleDescription;
};

const generatePhotos = () => {
  const photos = Array.from({length: MAX_RANDOM_PHOTOS}, () => `http://picsum.photos/248/152?r=` + Math.random());
  return generateRandomData(photos);
};

const generateDate = () => {
  let randomHours = Math.ceil(getRandomInt(-36, 72));
  let randomMinutes = Math.ceil(getRandomInt(-1800, 3600));
  return new Date(Date.now() + randomHours * randomMinutes * 1000);
};

export const generateEvent = () => {
  const eventType = generateRandomData(waypointTypes);
  const destination = generateRandomData(waypointDestinations);
  const offers = generateOffers(eventType.name);
  const description = generateDescription();
  const photos = generatePhotos();
  const price = Math.ceil(getRandomInt(10, 300));

  const startDate = generateDate();
  let endDate = generateDate();

  while (startDate > endDate) {
    endDate = generateDate();
  }

  return {
    eventType,
    destination,
    offers,
    description,
    photos,
    startDate,
    endDate,
    price,
    isFavorite: Boolean(getRandomInt(0, 1)),
    isActive: false
  };
};
