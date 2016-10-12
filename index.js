/**
 * [Date2 description]
 * @param {[type]} options [description]
 */
function Date2(options){
  if(!(this instanceof Date2))
    return new Date2(options);
    
  if(options instanceof Date)
    this.date = options;
  
  switch (typeof options) {
    case 'number':
      this.date = new Date(options);
      break;
    case 'string':
      this.date = this.parse(options);
      break;
    case 'object':
      this.date = this.create(options);
      break;
    default:
      this.date = new Date(options || null);
      break;
  }
      
};

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

Date2.prototype.create = function(options){
  var year  = +options.year  ,
      month = +options.month - 1,
      date  = +options.date  ,
      hour  = +options.hour  ,
      minute= +options.minute,
      second= +options.second;
  
  var _date = new Date;
  _date.setYear(year)
  _date.setMonth(month)
  _date.setDate(date)
  _date.setHours(hour);
  _date.setMinutes(minute)
  _date.setSeconds(second)
  return _date;
};

/**
 * [toString description]
 * @return {[type]} [description]
 */
Date2.prototype.toString = function(format) {
  if(format === undefined)
    return this.date.toString();
  var obj = {
    "M+": this.date.getMonth() + 1,
    "d+": this.date.getDate(),
    "h+": this.date.getHours() % 12 === 0 ? 12 : this.date.getHours() % 12,
    "H+": this.date.getHours(),
    "m+": this.date.getMinutes(),
    "s+": this.date.getSeconds(),
    "q+": Math.floor((this.date.getMonth() + 3) / 3),
    "S" : this.date.getMilliseconds()
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
