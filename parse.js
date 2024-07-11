/**
 * from
 * create date from string
 * @param {Object} o
 * @param {Boolean} utc
 */
export function from(o, utc = 'UTC') {
  var date;
  var type = typeof o;
  if (o === null)
    type = 'null';
  if (o instanceof Date)
    type = 'date';
  switch (type) {
    case 'string':
      date = parse(o);
      break;
    case 'number':
      date = new Date(o);
      break;
    case 'object':
      date = new Date(0);
      if (o.year !== undefined) date['set' + utc + 'FullYear'](+o.year);
      if (o.date !== undefined) date['set' + utc + 'Date'](+o.date);
      if (o.month !== undefined) date['set' + utc + 'Month'](+o.month - 1);
      if (o.hour !== undefined) date['set' + utc + 'Hours'](+o.hour);
      if (o.minute !== undefined) date['set' + utc + 'Minutes'](+o.minute);
      if (o.second !== undefined) date['set' + utc + 'Seconds'](+o.second);
      break;
    case 'null':
    case 'undefined':
      date = new Date();
      break
    default:
      date = new Date(o);
      break;
  }
  return date;
};
/**
 * parse
 * @param  {String} str
 * @return {Date}
 */
export function parse(str) {
  var obj = {}, map = {
    fullYear: 1,
    year: 2,
    month: 3,
    date: 4,
    time: 5,
    hour: 6,
    minute: 7,
    second: 8
  };
  var r1 = /((\d{4})-(\d{2})-(\d{2}))?\s?((\d{2}):(\d{2}):(\d{2}))?/;
  if (~str.indexOf('GMT')) { // GMT Date: Wed, 29 May 2019 05:53:32 GMT
    var a = str.split(/\W\D?/);
    obj.year = a[3];
    obj.month = "xxanebarprayunulugepctovec".indexOf(a[2]) / 2;
    obj.date = a[1];
    obj.hour = a[4];
    obj.minute = a[5];
    obj.second = a[6];
    var timezone = a[8];
  } else if (~str.indexOf('T')) { // ISO Date: 2019-03-28T18:57:14.149Z
    // TODO:
    return new Date(str);
  } else if (r1.test(str)) { // eg: 2019-05-29 10:32:29
    var matchs = r1.exec(str);
    for (var key in map) {
      obj[key] = matchs[map[key]];
    }
  } else {
    // TODO:
    return Date(str);
  }
  return from(obj);
};