import minidate, { from } from '../index.js';

console.log(from('2020-02-28'));

console.log(
  minidate('2020-02-28')
    .addDays(1)
    .toString('yyyy-MM-dd')
);