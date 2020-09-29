import {getRandomInt} from '../utils/common.js';

const MAX_RANDOM_DESCRIPTION = 4;
const MAX_RANDOM_PHOTOS = 5;

const eventTypes = [
  {
    name: `Taxi`,
    icon: `img/icons/taxi.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Bus`,
    icon: `img/icons/bus.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Train`,
    icon: `img/icons/train.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Ship`,
    icon: `img/icons/ship.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Transport`,
    icon: `img/icons/Transport.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Drive`,
    icon: `img/icons/drive.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Flight`,
    icon: `img/icons/flight.png`,
    eventTypeClass: `Transfer`
  },
  {
    name: `Check`,
    icon: `img/icons/check-in.png`,
    eventTypeClass: `Activity`
  },
  {
    name: `Sightseeing`,
    icon: `img/icons/sightseeing.png`,
    eventTypeClass: `Activity`
  },
  {
    name: `Restaurant`,
    icon: `img/icons/restaurant.png`,
    eventTypeClass: `Activity`
  }
];

const eventDestinations = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint-Petersburg`
];

const eventOffers = [
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

// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateRandomData = (data) => {
  const randomIndex = getRandomInt(0, data.length - 1);
  return data[randomIndex];
};

const generateOffers = (typeName) => {
  let newOffers = [];
  Object.values(eventOffers).map((key) => {
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
  const eventType = generateRandomData(eventTypes);
  const destination = generateRandomData(eventDestinations);
  const offers = generateOffers(eventType.name);
  const description = generateDescription();
  const photos = generatePhotos();
  const price = Math.ceil(getRandomInt(10, 300));

  let startDate = generateDate();
  let endDate = generateDate();

  while (startDate > endDate) {
    startDate = generateDate();
    endDate = generateDate();
  }

  return {
    id: generateId(),
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
