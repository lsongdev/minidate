
function zeroPad(str, len = 2) {
  str = str.toString();
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}

/**
 * format
 * @param {Date} date
 * @return {String} pattern
 */
export function format(date, pattern) {
  const _ = {
    YYYY: () => date.getFullYear(),
    M: () => date.getMonth() + 1,
    MM: () => zeroPad(date.getMonth() + 1),
    d: () => date.getDate(),
    dd: () => zeroPad(date.getDate()),
    HH: () => date.getHours(),
    hh: () => date.getHours(),
    mm: () => zeroPad(date.getMinutes()),
    ss: () => date.getSeconds(),
  };
  return pattern.replace(/\{([^\}]+)\}/g, (x, m) => _[m] && _[m]());
}