/**
 * offset
 * @param {*} date 
 * @param {*} offset 
 */
export function offset(date, offset) {
  const timestamp = date;
  return new Date(timestamp + offset);
};

export function addSeconds(date, second) {
  return offset(date, second * 1000);
};

export function addMinutes(date, minute) {
  return addSeconds(date, minute * 60);
};

export function addHours(date, hour) {
  return addMinutes(date, hour * 60);
}

export function addDays(date, day) {
  return addHours(date, day * 24);
};