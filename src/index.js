/**
 * [Date2 description]
 * @param {[type]} options [description]
 */
function Date2(options){
  if(!(this instanceof Date2))
    return new Date2(options);
  this.date = Date2.from(options);
  return this;
};

/**
 * create date from string
 */
Date2.from = function(o, utc){
  var date;
  var type = typeof o;
  if(o === null)
    type = 'null';
  if(o instanceof Date) 
    type = 'date';
  switch (type) {
    case 'string':
      date = Date2.parse(o);
      break;
    case 'number':
      date = new Date(o);
      break;
    case 'object':
      utc = utc ? 'UTC' : '';
      date = new Date(0);
      if(o.year   !== undefined) date['set' + utc + 'Year'    ](+o.year     );
      if(o.date   !== undefined) date['set' + utc + 'Date'    ](+o.date     );
      if(o.month  !== undefined) date['set' + utc + 'Month'   ](+o.month - 1);
      if(o.hour   !== undefined) date['set' + utc + 'Hours'   ](+o.hour     );
      if(o.minute !== undefined) date['set' + utc + 'Minutes' ](+o.minute   );
      if(o.second !== undefined) date['set' + utc + 'Seconds' ](+o.second   );
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
 * [parse description]
 * @param  {[type]} str     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
Date2.parse = function(str){
  var obj = {}, map = {
    fullYear: 1,
    year: 2,
    month:3,
    date:4,
    time: 5,
    hour: 6,
    minute: 7,
    second: 8
  };
  var r1 = /((\d{4})-(\d{2})-(\d{2}))?\s?((\d{2}):(\d{2}):(\d{2}))?/;
  if(~str.indexOf('GMT')) { // GMT Date: Wed, 29 May 2019 05:53:32 GMT
    var a = str.split(/\W\D?/);
    obj.year = a[3];
    obj.month = "xxanebarprayunulugepctovec".indexOf(a[2]) / 2;
    obj.date = a[1];
    obj.hour = a[4];
    obj.minute = a[5];
    obj.second = a[6];
    var timezone = a[8];
  } else if(~str.indexOf('T')){ // ISO Date: 2019-03-28T18:57:14.149Z
    // TODO:
    return new Date(str);
  } else if(r1.test(str)) { // eg: 2019-05-29 10:32:29
    var matchs = r1.exec(str);
    for(var key in map){
      obj[ key ] = matchs[ map[ key ] ];
    }
  } else {
    // TODO:
    return Date(str);
  }
  return Date2.from(obj);
};

/**
 * [now description]
 * @return {[type]} [description]
 */
Date2.prototype.now = function(){
  return Date.now();
};

Date2.TIME_AGO = {
  prefix: "",
  suffix: " ago",
  seconds: "less than a minute",
  minute: "about a minute",
  minutes: "%d minutes",
  hour: "about an hour",
  hours: "about %d hours",
  day: "a day",
  days: "%d days",
  month: "about a month",
  months: "%d months",
  year: "about a year",
  years: "%d years"
};

/**
 * [ago description]
 * @return {[type]} [description]
 */
Date2.prototype.ago = function(){
  var diff = new Date - this.date;
  var seconds = diff    / 1000;
  var minutes = seconds / 60;
  var hours   = minutes / 60;
  var days    = hours   / 24;
  var months  = days    / 30;
  var years   = days    / 365;
  function template(t, n) {
    n = Math.abs(Math.round(n));
    return Date2.TIME_AGO[t] &&
      Date2.TIME_AGO[t].replace(/%d/i, n);
  };
  return Date2.TIME_AGO.prefix + (
  seconds < 45  && template('seconds' , seconds) ||
  seconds < 90  && template('minute'  , 1      ) ||
  minutes < 45  && template('minutes' , minutes) ||
  minutes < 90  && template('hour'    , 1      ) ||
  hours   < 24  && template('hours'   , hours  ) ||
  hours   < 42  && template('day'     , 1      ) ||
  days    < 30  && template('days'    , days   ) ||
  days    < 45  && template('month'   , 1      ) ||
  days    < 365 && template('months'  , months ) ||
  years   < 1.5 && template('year'    , 1      ) ||
                   template('years'   , years  )
  ) + Date2.TIME_AGO.suffix;
};

Date2.prototype.offset = function(offset){
  var timestamp = +this.date;
  this.date = new Date(timestamp + offset);
  return this;
};

Date2.prototype.addSeconds = function(second){
  return this.offset(second * 1000);
};

Date2.prototype.addMinutes = function(minute){
  return this.addSeconds(minute * 60);
};

Date2.prototype.addHours = function(hour){
  return this.addMinutes(hour * 60);
}

Date2.prototype.addDays = function(day){
  return this.addHours(day * 24);
};

/**
 * [toString description]
 * @return {[type]} [description]
 */
Date2.prototype.toString = function(format) {
  if(format === undefined)
    return this.date.toString();
  var obj = {
    'M+': this.date.getMonth() + 1,
    'd+': this.date.getDate(),
    'h+': this.date.getHours() % 12 === 0 ? 12 : this.date.getHours() % 12,
    'H+': this.date.getHours(),
    'm+': this.date.getMinutes(),
    's+': this.date.getSeconds(),
    'q+': Math.floor((this.date.getMonth() + 3) / 3),
    'S' : this.date.getMilliseconds()
  };
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for(var k in obj) {
    if(new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
    }
  }
  return format;
}

module.exports = Date2;
