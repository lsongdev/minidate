const minidate = require('..');

console.log(
  minidate('2020-02-28')
  .addDays(1)
  .toString('yyyy-MM-dd')
);