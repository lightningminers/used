const PARSE = /^(\d{4})-?(\d{2})-?(\d{1,2})$/
const FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss'
const FORMAT_PARSE = /Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}/g
const SECONDS = 1;
const MINUTE = SECONDS * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MILLISECONDS = 1000;
const MILLISECONDS_MINUTE = MINUTE * MILLISECONDS;
const MILLISECONDS_HOUR = HOUR * MILLISECONDS;
const MILLISECONDS_DAY = DAY * MILLISECONDS;
const MILLISECONDS_WEEK = WEEK * MILLISECONDS;


function parseCF(c){
  if (c === null){
    return new Date(NaN);
  }
  if (c === undefined){
    return new Date();
  }
  if (c instanceof Date){
    return c;
  }
  const reg = String(c).match(PARSE)
  if (reg){
    return new Date(reg[1], reg[2] - 1, reg[3]);
  }
  return new Date(c);
}

function appendZero(z){
  return z < 10 ? '0' + z : String(z);
}

class Time{
  constructor(c){
    this.dateObj = parseCF(c);
    this.init();
  }

  init(){
    this.y = this.dateObj.getFullYear();  //年
    this.m = this.dateObj.getMonth() + 1; //月
    this.d = this.dateObj.getDate(); // 日
    this.w = this.dateObj.getDay(); // 星期几
    this.h = this.dateObj.getHours(); //小时
    this.hm = this.dateObj.getMinutes(); // 分
    this.hms = this.dateObj.getSeconds(); // 秒
    this.hmss = this.dateObj.getMilliseconds(); //毫秒
  }

  isValid(){
    return this.dateObj.toString() !== 'Invalid Date';
  }

  unix(){
    return Math.floor(this.valueOf() / 1000);
  }

  valueOf(){
    return this.dateObj.getTime();
  }

  clone(){
    return new Time(this)
  }

  format(str){
    str = str || FORMAT_DEFAULT;
    return str.replace(FORMAT_PARSE, (ma) => {
      switch(ma){
        case 'YYYY':
          return String(this.y);
        case 'MM':
          return appendZero(this.m);
        case 'DD':
          return appendZero(this.d);
        case 'hh':
          return appendZero(this.h);
        case 'mm':
          return appendZero(this.hm);
        case 'ss':
          return appendZero(this.hms);
        case 'a':
          return this.h < 12 ? 'am' : 'pm';
        case 'A':
          return this.h < 12 ? 'AM' : 'PM';
        default:
          return this.dateObj.toString();
      }
    });
  }

  set(number, units){
    const d = this.clone();
    switch(units){
      case 'Y':
      case 'year':
        d.dateObj.setFullYear(number);
        break;
      case 'M':
      case 'month':
        d.dateObj.setMonth(number);
        break;
    }
    d.init();
    return d;
  }

  add(number, units){
    let step;
    if (['M', 'month'].indexOf(units) > -1){
      return this.set(number, units);
    }
    if (['Y', 'year'].indexOf(units) > -1){
      return this.set(number, units);
    }
    switch(units){
      case 'm':
      case 'minute':
        step = MILLISECONDS_MINUTE;
        break
      case 'h':
      case 'hour':
        step = MILLISECONDS_HOUR;
        break
      case 'd':
      case 'day':
        step = MILLISECONDS_DAY;
        break
      case 'w':
      case 'week':
        step = MILLISECONDS_WEEK;
        break
      default:
        step = MILLISECONDS
    }
    const next = this.valueOf() + (number * step);
    return new Time(next);
  }

  subtract(number, units){
    return this.add(number * -1, units);
  }

  toJSON(){
    return {
      'years': this.y,
      'months': this.m,
      'date': this.d,
      'hours': this.h,
      'minutes': this.hm,
      'seconds': this.hms,
      'milliseconds': this.hmss
    }
  }

  toJSONString(){
    return JSON.stringify(this.toJSON());
  }

  toDateObj(){
    return this.dateObj;
  }

  isLeapYear(){
    return (0 == this.y%4 && (this.y%100 !=0 || this.y%400 == 0))
  }

  isBefore(s){
    return this.valueOf() < s.valueOf();
  }

  isAfter(s){
    return this.valueOf() > s.valueOf();
  }

  isSame(s){
    return this.valueOf() === s.valueOf();
  }

  daysInMonth(y, m){
    return new Date(y !== undefined ? y : this.y, m !== undefined ? m : this.m, 0).getDate();
  }
}

export default Time;