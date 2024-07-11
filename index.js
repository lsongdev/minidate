import { format } from './format.js';
import { timeago } from './timeago.js';
import { parse, from } from './parse.js';
import {
  offset,
  addDays,
  addHours,
  addMinutes,
  addSeconds
} from './offset.js';

/**
 * Minidate
 * @class
 * @param {Object} date
 */
export function Minidate(date) {
  if (!(this instanceof Minidate))
    return new Minidate(date);
  this.date = from(date);
  return this;
}
/**
 * offset
 * @param {Number} offset
 */
Minidate.prototype.offset = function (o) {
  return offset(this.date, o);
};
/**
 * addDays
 * @param {Number} offset
 */
Minidate.prototype.addDays = function (offset) {
  return addDays(this.date, offset);
};
/**
 * addHours
 * @param {Number} offset
 */
Minidate.prototype.addHours = function (offset) {
  return addHours(this.date, offset);
};
/**
 * addMinutes
 * @param {Number} offset
 */
Minidate.prototype.addMinutes = function (offset) {
  return addMinutes(this.date, offset);
};
/**
 * addSeconds
 * @param {Number} offset
 */
Minidate.prototype.addSeconds = function (offset) {
  return addSeconds(this.date, offset);
};
/**
 * ago
 */
Minidate.prototype.ago = function () {
  return timeago(this.date);
};
/**
 * toString
 * @param {String} pattern
 */
Minidate.prototype.toString = function (pattern) {
  return format(this.date, pattern);
};
/**
 * now
 */
Minidate.prototype.now = function () {
  return Date.now();
};

export {
  from,
  parse,
  offset,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
};

export default Minidate;