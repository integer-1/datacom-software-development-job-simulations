import auCinemas from './auCinemas.json';
import nzCinemas from './nzCinemas.json';

import allCinemas, { breakdown } from './cinemas';

test('breakdown matches count from files', async () => {
  expect(breakdown.au).toEqual(auCinemas.length);
  expect(breakdown.nz).toEqual(nzCinemas.length);
});

test('total count matches from files', async () => {
  expect(allCinemas.length).toEqual(auCinemas.length + nzCinemas.length);
});