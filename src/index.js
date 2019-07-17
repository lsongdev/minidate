import { format } from './format';
import { timeago } from './timeago';
import { parse, from } from './parse';
import {
  offset,
  addDays,
  addHours,
  addMinutes,
  addSeconds
} from './offset';
/**
 * [Minidate description]
 * @param {[type]} options [description]
 */
function Minidate(options) {
  if (!(this instanceof Minidate))
    return new Minidate(options);
  this.date = Minidate.from(options);
  return this;
}

Minidate.from = from;
Minidate.parse = parse;

Minidate.prototype.offset = function (o) {
  return offset(this.date, o);
};
Minidate.prototype.addDays = function (offset) {
  return addDays(this.date, offset);
};
Minidate.prototype.addHours = function (offset) {
  return addHours(this.date, offset);
};
Minidate.prototype.addMinutes = function (offset) {
  return addMinutes(this.date, offset);
};
Minidate.prototype.addSeconds = function (offset) {
  return addSeconds(this.date, offset);
};
Minidate.prototype.ago = function(){
  return timeago(this.date);
};
Minidate.prototype.toString = function(pattern){
  return format(this.date, pattern);
};

Minidate.prototype.now = function(){
  return Date.now();
};

export default Minidate;
