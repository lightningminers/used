'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PARSE = /^(\d{4})-?(\d{2})-?(\d{1,2})$/;
var FORMAT_DEFAULT = 'YYYY-MM-DD hh:mm:ss';
var FORMAT_PARSE = /Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}/g;

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
    key: 'year',
    value: function year() {
      return this.y;
    }
  }, {
    key: 'month',
    value: function month() {
      return this.m;
    }
  }, {
    key: 'day',
    value: function day() {
      return this.d;
    }
  }, {
    key: 'dayOfTheWeek',
    value: function dayOfTheWeek() {
      return this.w;
    }
  }, {
    key: 'hour',
    value: function hour() {
      return this.h;
    }
  }, {
    key: 'miunte',
    value: function miunte() {
      return this.hm;
    }
  }, {
    key: 'second',
    value: function second() {
      return this.hms;
    }
  }, {
    key: 'milliSecond',
    value: function milliSecond() {
      return this.hmss;
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
  }]);

  return Time;
}();

exports.default = Time;
//# sourceMappingURL=time.js.map