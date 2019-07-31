
export const TIME_AGO = {
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

export function template(t, n) {
  n = Math.abs(Math.round(n));
  return TIME_AGO[t] &&
    TIME_AGO[t].replace(/%d/i, n);
};

/**
 * timeago
 * @param {Date} date
 * @return {String}
 */
export function timeago(date) {
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
};
