const PARSE = /^(\d{4})-?(\d{2})-?(\d{1,2})$/
const FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss'
const FORMAT_PARSE = /Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}/g

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

  year(){
    return this.y;
  }

  month(){
    return this.m;
  }

  day(){
    return this.d;
  }

  dayOfTheWeek(){
    return this.w;
  }

  hour(){
    return this.h;
  }

  miunte(){
    return this.hm;
  }

  second(){
    return this.hms;
  }

  milliSecond(){
    return this.hmss;
  }

  unix(){
    return Math.floor(this.valueOf() / 1000);
  }

  valueOf(){
    return this.dateObj.getTime();
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
}