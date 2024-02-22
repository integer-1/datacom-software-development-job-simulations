import auCinemas from './auCinemas.json';
import nzCinemas from './nzCinemas.json';
import { countBy } from 'lodash';
import { matchCinemaToFranchise } from './franchises';


const addKeyToObject = (key, value) => {
  // This function returns a function that modifies an object by adding a specific key & value.
  return (obj) => {
    // 
    return {
      ...obj,
      [key]: value,
    }
  }
}

// Combine the NZ & Aus data after adding the countryCodes to each cinema object
const cinemas = [
  ...auCinemas.map(addKeyToObject('countryCode', 'au')),
  ...nzCinemas.map(addKeyToObject('countryCode', 'nz'))
].map(cinema => {
  // Match each cinema to a franchise and add to each cinema object
  const franchise = matchCinemaToFranchise(cinema);
  return addKeyToObject('franchise', franchise)(cinema);
});

export const breakdown = countBy(cinemas, 'countryCode');
export default cinemas;