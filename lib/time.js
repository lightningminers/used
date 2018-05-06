'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PARSE = /^(\d{4})-?(\d{2})-?(\d{1,2})$/;
var FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss';
var FORMAT_PARSE = /Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}/g;
var SECONDS = 1;
var MINUTE = SECONDS * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MILLISECONDS = 1000;
var MILLISECONDS_MINUTE = MINUTE * MILLISECONDS;
var MILLISECONDS_HOUR = HOUR * MILLISECONDS;
var MILLISECONDS_DAY = DAY * MILLISECONDS;
var MILLISECONDS_WEEK = WEEK * MILLISECONDS;

function parseCF(c) {
  if (c === null) {
    return new Date(NaN);
  }
  if (c === undefined) {
    return new Date();
  }
  if (c instanceof Date) {
    return c;
  }
  var reg = String(c).match(PARSE);
  if (reg) {
    return new Date(reg[1], reg[2] - 1, reg[3]);
  }
  return new Date(c);
}

function appendZero(z) {
  return z < 10 ? '0' + z : String(z);
}

var Time = function () {
  function Time(c) {
    _classCallCheck(this, Time);

    this.dateObj = parseCF(c);
    this.init();
  }

  _createClass(Time, [{
    key: 'init',
    value: function init() {
      this.y = this.dateObj.getFullYear(); //年
      this.m = this.dateObj.getMonth() + 1; //月
      this.d = this.dateObj.getDate(); // 日
      this.w = this.dateObj.getDay(); // 星期几
      this.h = this.dateObj.getHours(); //小时
      this.hm = this.dateObj.getMinutes(); // 分
      this.hms = this.dateObj.getSeconds(); // 秒
      this.hmss = this.dateObj.getMilliseconds(); //毫秒
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.dateObj.toString() !== 'Invalid Date';
    }
  }, {
    key: 'unix',
    value: function unix() {
      return Math.floor(this.valueOf() / 1000);
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.dateObj.getTime();
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Time(this);
    }
  }, {
    key: 'format',
    value: function format(str) {
      var _this = this;

      str = str || FORMAT_DEFAULT;
      return str.replace(FORMAT_PARSE, function (ma) {
        switch (ma) {
          case 'YYYY':
            return String(_this.y);
          case 'MM':
            return appendZero(_this.m);
          case 'DD':
            return appendZero(_this.d);
          case 'hh':
            return appendZero(_this.h);
          case 'mm':
            return appendZero(_this.hm);
          case 'ss':
            return appendZero(_this.hms);
          case 'a':
            return _this.h < 12 ? 'am' : 'pm';
          case 'A':
            return _this.h < 12 ? 'AM' : 'PM';
          default:
            return _this.dateObj.toString();
        }
      });
    }
  }, {
    key: 'set',
    value: function set(number, units) {
      var d = this.clone();
      switch (units) {
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
  }, {
    key: 'add',
    value: function add(number, units) {
      var step = void 0;
      if (['M', 'month'].indexOf(units) > -1) {
        return this.set(number, units);
      }
      if (['Y', 'year'].indexOf(units) > -1) {
        return this.set(number, units);
      }
      switch (units) {
        case 'm':
        case 'minute':
          step = MILLISECONDS_MINUTE;
          break;
        case 'h':
        case 'hour':
          step = MILLISECONDS_HOUR;
          break;
        case 'd':
        case 'day':
          step = MILLISECONDS_DAY;
          break;
        case 'w':
        case 'week':
          step = MILLISECONDS_WEEK;
          break;
        default:
          step = MILLISECONDS;
      }
      var next = this.valueOf() + number * step;
      return new Time(next);
    }
  }, {
    key: 'subtract',
    value: function subtract(number, units) {
      return this.add(number * -1, units);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        'years': this.y,
        'months': this.m,
        'date': this.d,
        'hours': this.h,
        'minutes': this.hm,
        'seconds': this.hms,
        'milliseconds': this.hmss
      };
    }
  }, {
    key: 'toJSONString',
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: 'toDateObj',
    value: function toDateObj() {
      return this.dateObj;
    }
  }, {
    key: 'isLeapYear',
    value: function isLeapYear() {
      return 0 == this.y % 4 && (this.y % 100 != 0 || this.y % 400 == 0);
    }
  }, {
    key: 'isBefore',
    value: function isBefore(s) {
      return this.valueOf() < s.valueOf();
    }
  }, {
    key: 'isAfter',
    value: function isAfter(s) {
      return this.valueOf() > s.valueOf();
    }
  }, {
    key: 'isSame',
    value: function isSame(s) {
      return this.valueOf() === s.valueOf();
    }
  }, {
    key: 'daysInMonth',
    value: function daysInMonth(y, m) {
      return new Date(y !== undefined ? y : this.y, m !== undefined ? m : this.m, 0).getDate();
    }
  }]);

  return Time;
}();

exports.default = Time;
//# sourceMappingURL=time.js.map