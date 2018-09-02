"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return new Date(Number(reg[1]), Number(reg[2]) - 1, Number(reg[3]));
    }
    return new Date(c);
}
function appendZero(z) {
    return z < 10 ? '0' + z : String(z);
}
var Time = /** @class */ (function () {
    function Time(c) {
        this.dateObj = parseCF(c);
        this.y = this.dateObj.getFullYear(); //年
        this.m = this.dateObj.getMonth() + 1; //月
        this.d = this.dateObj.getDate(); // 日
        this.w = this.dateObj.getDay(); // 星期几
        this.h = this.dateObj.getHours(); //小时
        this.hm = this.dateObj.getMinutes(); // 分
        this.hms = this.dateObj.getSeconds(); // 秒
        this.hmss = this.dateObj.getMilliseconds(); //毫秒
    }
    Time.prototype.init = function () {
        this.y = this.dateObj.getFullYear(); //年
        this.m = this.dateObj.getMonth() + 1; //月
        this.d = this.dateObj.getDate(); // 日
        this.w = this.dateObj.getDay(); // 星期几
        this.h = this.dateObj.getHours(); //小时
        this.hm = this.dateObj.getMinutes(); // 分
        this.hms = this.dateObj.getSeconds(); // 秒
        this.hmss = this.dateObj.getMilliseconds(); //毫秒
    };
    Time.prototype.isValid = function () {
        return this.dateObj.toString() !== 'Invalid Date';
    };
    Time.prototype.unix = function () {
        return Math.floor(this.valueOf() / 1000);
    };
    Time.prototype.valueOf = function () {
        return this.dateObj.getTime();
    };
    Time.prototype.clone = function () {
        return new Time(this);
    };
    Time.prototype.format = function (str) {
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
    };
    Time.prototype.set = function (num, units) {
        var d = this.clone();
        switch (units) {
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
    };
    Time.prototype.add = function (num, units) {
        var step;
        if (['M', 'month'].indexOf(units) > -1) {
            return this.set(num, units);
        }
        if (['Y', 'year'].indexOf(units) > -1) {
            return this.set(num, units);
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
        var next = this.valueOf() + (num * step);
        return new Time(next);
    };
    Time.prototype.subtract = function (num, units) {
        return this.add(num * -1, units);
    };
    Time.prototype.toJSON = function () {
        return {
            'years': this.y,
            'months': this.m,
            'date': this.d,
            'hours': this.h,
            'minutes': this.hm,
            'seconds': this.hms,
            'milliseconds': this.hmss
        };
    };
    Time.prototype.toJSONString = function () {
        return JSON.stringify(this.toJSON());
    };
    Time.prototype.toDateObj = function () {
        return this.dateObj;
    };
    Time.prototype.isLeapYear = function () {
        return (0 == this.y % 4 && (this.y % 100 != 0 || this.y % 400 == 0));
    };
    Time.prototype.isBefore = function (s) {
        return this.valueOf() < s.valueOf();
    };
    Time.prototype.isAfter = function (s) {
        return this.valueOf() > s.valueOf();
    };
    Time.prototype.isSame = function (s) {
        return this.valueOf() === s.valueOf();
    };
    Time.prototype.daysInMonth = function (y, m) {
        return new Date(y !== undefined ? y : this.y, m !== undefined ? m : this.m, 0).getDate();
    };
    return Time;
}());
exports.Time = Time;
function time(c) {
    return new Time(c);
}
exports.time = time;
;
