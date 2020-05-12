const { format } = require('./format');
const { timeago } = require('./timeago');
const { parse, from } = require('./parse');
const {
  offset,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
} = require('./offset');

/**
 * Minidate
 * @class
 * @param {Object} date
 */
function Minidate(date) {
  if (!(this instanceof Minidate))
    return new Minidate(date);
  this.date = Minidate.from(date);
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

Object.assign(Minidate, {
  from,
  parse,
  format,
  offset,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  timeago,
});

module.exports = Minidate;
