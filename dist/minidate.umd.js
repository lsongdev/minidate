/**
 * by Lsong Copyright 2019-07-17
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.minidate = factory());
}(this, function () { 'use strict';

  function format(date, pattern) {
    if (pattern === undefined)
      return date.toString();
    var obj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in obj) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (("00" + obj[k]).substr(("" + obj[k]).length)));
      }
    }
    return pattern;
  }

  const TIME_AGO = {
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
  function template(t, n) {
    n = Math.abs(Math.round(n));
    return TIME_AGO[t] &&
      TIME_AGO[t].replace(/%d/i, n);
  }function timeago(date) {
    const diff = new Date - date;
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = days / 365;
    return TIME_AGO.prefix + (
      seconds < 45 && template('seconds', seconds) ||
      seconds < 90 && template('minute', 1) ||
      minutes < 45 && template('minutes', minutes) ||
      minutes < 90 && template('hour', 1) ||
      hours < 24 && template('hours', hours) ||
      hours < 42 && template('day', 1) ||
      days < 30 && template('days', days) ||
      days < 45 && template('month', 1) ||
      days < 365 && template('months', months) ||
      years < 1.5 && template('year', 1) ||
      template('years', years)
    ) + TIME_AGO.suffix;
  }

  function from(o, utc = '') {
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
        if (o.year !== undefined) date['set' + utc + 'Year'](+o.year);
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
  }function parse(str) {
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
    if (~str.indexOf('GMT')) {
      var a = str.split(/\W\D?/);
      obj.year = a[3];
      obj.month = "xxanebarprayunulugepctovec".indexOf(a[2]) / 2;
      obj.date = a[1];
      obj.hour = a[4];
      obj.minute = a[5];
      obj.second = a[6];
      var timezone = a[8];
    } else if (~str.indexOf('T')) {
      return new Date(str);
    } else if (r1.test(str)) {
      var matchs = r1.exec(str);
      for (var key in map) {
        obj[key] = matchs[map[key]];
      }
    } else {
      return Date(str);
    }
    return from(obj);
  }

  function offset(date, offset) {
    const timestamp = date;
    return new Date(timestamp + offset);
  }function addSeconds(date, second) {
    return offset(date, second * 1000);
  }function addMinutes(date, minute) {
    return addSeconds(date, minute * 60);
  }function addHours(date, hour) {
    return addMinutes(date, hour * 60);
  }
  function addDays(date, day) {
    return addHours(date, day * 24);
  }

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

  return Minidate;

}));
