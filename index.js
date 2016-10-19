/**
 * [Date2 description]
 * @param {[type]} options [description]
 */
function Date2(options){
  if(!(this instanceof Date2))
    return new Date2(options);
  
  switch (typeof options) {
    case 'number':
      this.date = new Date(options);
      break;
    case 'string':
      this.date = this.parse(options);
      break;
    case 'object':
      if(options instanceof Date){
        this.date = options;
      }else{
        this.date = this.create(options);
      }
      break;
    default:
      this.date = new Date(options || null);
      break;
  }
      
};

/**
 * [now description]
 * @return {[type]} [description]
 */
Date2.prototype.now = function(){
  return +this.date;
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

/**
 * [parse description]
 * @param  {[type]} str     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
Date2.prototype.parse = function(str, options){
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
  var matchs = /((\d{4})-(\d{2})-(\d{2}))?\s?((\d{2}):(\d{2}):(\d{2}))?/.exec(str);
  for(var key in map){
    obj[ key ] = matchs[ map[ key ] ];
  }
  return this.create(obj);
};
/**
 * [create description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
Date2.prototype.create = function(options){
  var date = new Date;
  date.setYear   (+options.year     );
  date.setMonth  (+options.month - 1);
  date.setDate   (+options.date     );
  date.setHours  (+options.hour     );
  date.setMinutes(+options.minute   );
  date.setSeconds(+options.second   );
  return date;
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
