const assert = require('assert');
const Date2  = require('../');

describe('Date2 test case', function(){


  var date = new Date(1476885953919);


  it('year(yyyy)', function(){
    var date2 = new Date2(date);
    assert.equal('2016', date2.toString('yyyy'));
  })

  it('month(MM)', function(){
    var date2 = new Date2(date);
    assert.equal('10', date2.toString('MM'));
  })

  it('date(dd)', function(){
    var date2 = new Date2(date);
    assert.equal('19', date2.toString('dd'));
  })

  it('hours(HH)', function(){
    var date2 = new Date2(date);
    assert.equal('22', date2.toString('HH'));
  })

  it('minute(mm)', function(){
    var date2 = new Date2(date);
    assert.equal('19', date2.toString('dd'));
  })

  it('seconds(ss)', function(){
    var date2 = new Date2(date);
    assert.equal('53', date2.toString('ss'));
  })

  it('seconds to mm:ss', function(){
    var date2 = new Date2(date);
    assert.equal('05:53', date2.toString('mm:ss'));
  })

  it('parse date', function(){
    var date2 = new Date2('2016-10-11 18:22:11');
    assert.equal('2016/10/11', date2.toString('yyyy/MM/dd'));
  })

  it('new Date2().now()', function(){
    var date2 = new Date2(date);
    assert.equal(+date, date2.now());
  })

  it('timeago', function(){
    var date2 = new Date2(date);
    assert.equal('8 days ago', date2.ago());
  })

});