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

export interface ITimeToJSON {
  years: number;
  months: number;
  date: number;
  hours: number,
  minutes: number;
  seconds: number;
  milliseconds: number;
}

function parseCF(c: any): Date{
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
    return new Date(Number(reg[1]), Number( reg[2]) - 1, Number(reg[3]));
  }
  return new Date(c);
}

function appendZero(z: number){
  return z < 10 ? '0' + z : String(z);
}

class Time {
  public static time(c: any): Time {
    return new Time(c);
  }
  public dateObj: Date;
  public y: number;
  public m: number;
  public d: number;
  public w: number;
  public h: number;
  public hm: number;
  public hms: number;
  public hmss: number;

  constructor(c: any){
    this.dateObj = parseCF(c);
    this.y = this.dateObj.getFullYear();  //年
    this.m = this.dateObj.getMonth() + 1; //月
    this.d = this.dateObj.getDate(); // 日
    this.w = this.dateObj.getDay(); // 星期几
    this.h = this.dateObj.getHours(); //小时
    this.hm = this.dateObj.getMinutes(); // 分
    this.hms = this.dateObj.getSeconds(); // 秒
    this.hmss = this.dateObj.getMilliseconds(); //毫秒
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

  isValid(): boolean{
    return this.dateObj.toString() !== 'Invalid Date';
  }

  unix(): number{
    return Math.floor(this.valueOf() / 1000);
  }

  valueOf(): number{
    return this.dateObj.getTime();
  }

  clone(): Time{
    return new Time(this)
  }

  format(str: string){
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

  set(num: number, units: string): Time{
    const d = this.clone();
    switch(units){
      case 'Y':
      case 'year':
        d.dateObj.setFullYear(num);
        break;
      case 'M':
      case 'month':
        d.dateObj.setMonth(num);
        break;
    }
    d.init();
    return d;
  }

  add(num: number, units: string): Time{
    let step;
    if (['M', 'month'].indexOf(units) > -1){
      return this.set(num, units);
    }
    if (['Y', 'year'].indexOf(units) > -1){
      return this.set(num, units);
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
    const next = this.valueOf() + (num * step);
    return new Time(next);
  }

  subtract(num: number, units: string): Time{
    return this.add(num * -1, units);
  }

  toJSON(): ITimeToJSON{
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

  isBefore(s: Time){
    return this.valueOf() < s.valueOf();
  }

  isAfter(s: Time){
    return this.valueOf() > s.valueOf();
  }

  isSame(s: Time){
    return this.valueOf() === s.valueOf();
  }

  daysInMonth(y: number, m: number){
    return new Date(y !== undefined ? y : this.y, m !== undefined ? m : this.m, 0).getDate();
  }
}

export default Time;
