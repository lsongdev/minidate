/**
 * offset
 * @param {*} date 
 * @param {*} offset 
 */
function offset(date, offset) {
  const timestamp = date;
  return new Date(timestamp + offset);
};

function addSeconds(date, second) {
  return offset(date, second * 1000);
};

function addMinutes(date, minute) {
  return addSeconds(date, minute * 60);
};

function addHours(date, hour) {
  return addMinutes(date, hour * 60);
}

function addDays(date, day) {
  return addHours(date, day * 24);
};

module.exports = {
  offset,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
};