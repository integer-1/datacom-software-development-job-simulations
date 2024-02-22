import { mergeWith } from 'lodash';

import { breakdown } from './cinemas';
import franchiseData from './franchises';
const franchises = Object.values(franchiseData);

test('count matches (no double counting)', async () => {
  const breakdowns = franchises.map(f => f.breakdown);
  const franchiseBreakdown = breakdowns.reduce((prev, cur) => mergeWith(prev, cur, (prevVal, curVal) => prevVal + curVal));

  expect(franchiseBreakdown.au).toEqual(breakdown.au);
  expect(franchiseBreakdown.nz).toEqual(breakdown.nz);
});