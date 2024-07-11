import assert from 'assert';
import test from './test.js';
import minidate from '../index.js';

var date = new Date(1476885953919);

test('year(yyyy)', function () {
  var date2 = new minidate(date);
  assert.equal('2016', date2.toString('{YYYY}'));
})

test('month(MM)', function () {
  var date2 = new minidate(date);
  assert.equal('10', date2.toString('{MM}'));
})

test('date(dd)', function () {
  var date2 = new minidate(date);
  assert.equal('19', date2.toString('{dd}'));
})

test('hours(HH)', function () {
  var date2 = new minidate(date);
  assert.equal('22', date2.toString('{HH}'));
})

test('minute(mm)', function () {
  var date2 = new minidate(date);
  assert.equal('19', date2.toString('{dd}'));
})

test('seconds(ss)', function () {
  var date2 = new minidate(date);
  assert.equal('53', date2.toString('{ss}'));
})

test('seconds to mm:ss', function () {
  var date2 = new minidate(date);
  assert.equal(date2.toString('{mm}:{ss}'), '05:53');
})

test('parse date', function () {
  var date2 = new minidate('2016-10-11 18:22:11');
  // console.log(date2);
  // assert.equal(date2.toString('{yyyy}/{MM}/{dd}'), '2016/10/11');
})

// test('new minidate().now()', function () {
//   var date2 = minidate();
//   assert.equal(Date.now(), date2.now());
// })

// test('timeago', function () {
//   var date2 = new minidate(date);
//   assert.ok(date2.ago());
// })
