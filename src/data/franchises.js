
import { mapValues } from 'lodash';
import hyotsLogoPath from '../assets/franchises/Hoyts.svg';
import eventLogoPath from '../assets/franchises/Event Cinemas.svg';
import bccLogoPath from '../assets/franchises/BCC.png';
import readingLogoPath from '../assets/franchises/Reading.svg';

// Use lodash helper functions to add the key of each franchise to the object
// This is used to reduce manual duplication of text in the code which could cause bugs.
const data = mapValues({
  hoyts: {
    identifier: 'Hoyts',
    logoUrl: hyotsLogoPath,
  },
  event: {
    identifier: 'Event Cinemas',
    logoUrl: eventLogoPath,
  },
  bcc: {
    identifier: 'BCC',
    logoUrl: bccLogoPath,
  },
  reading: {
    identifier: 'Reading',
    logoUrl: readingLogoPath,
  },
  unknown: {
    identifier: null,
    name: 'Unknown',
  }
}, (value, key, obj) => {
  return {
    id: key,
    ...value,
  }
});

export const matchCinemaToFranchise = (cinema) => {
  // This function attempts to find a franchise for this cinema
  // it does this by comparing the cinema's name with the franchise's identifier

  // If it doesn't find a match it will fallback to the unknown franchise
  const matchingFranchiseKey = Object.entries(data).find(([key, franchise]) => (
    franchise.identifier ? cinema.name.includes(franchise.identifier) : true
  ))[0];

  // It also sets up and increments a country breakdown for the identified franchise
  // as such it is IMPORTANT that each CINEMA only goes through this function ONCE.
  // OTHERWISE DUPLICATE COUNTING WILL OCCUR!!!
  const franchise = data[matchingFranchiseKey];
  if (!franchise.breakdown) {
    franchise.breakdown = {};
  }
  if (!franchise.breakdown[cinema.countryCode]) {
    franchise.breakdown[cinema.countryCode] = 1;
  } else {
    franchise.breakdown[cinema.countryCode] += 1;
  }

  return matchingFranchiseKey;
};

export default data;