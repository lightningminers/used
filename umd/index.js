(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Used", [], factory);
	else if(typeof exports === 'object')
		exports["Used"] = factory();
	else
		root["Used"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function parse(qs, sep, eq) {
  var obj = Object.create(null);
  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }
  sep = sep || '&';
  eq = eq || '=';
  var params = qs.split(sep);
  var i = 0;
  var l = params.length;
  for (; i < l; i++) {
    var items = params[i].split(eq);
    var queryKey = items[0].trim();
    var queryVal = '';
    if (items.length >= 3) {
      (function () {
        items.splice(0, 1);
        var lastIndex = items.length - 1;
        items.forEach(function (v, i) {
          v = v.trim();
          if (i === lastIndex) {
            queryVal += v;
          } else {
            queryVal += v + eq;
          }
        });
      })();
    } else {
      queryVal = items[1].trim();
    }
    var cur = obj[queryKey];
    if (cur) {
      if (Array.isArray(cur)) {
        cur.push(decodeURIComponent(queryVal));
      } else {
        var temp = cur;
        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(decodeURIComponent(queryVal));
      }
    } else {
      obj[queryKey] = decodeURIComponent(queryVal);
    }
  }
  return obj;
}

function stringify(obj, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    var keys = Object.keys(obj);
    var len = keys.length;
    var flast = len - 1;
    var fields = '';
    var i = 0;
    for (; i < len; i++) {
      var k = keys[i];
      var v = obj[k];
      var ks = k + eq;
      if (Array.isArray(v)) {
        var vlen = v.length;
        var vlast = vlen - 1;
        var j = 0;
        for (; j < vlen; ++j) {
          fields += ks + decodeURIComponent(v[j]);
          if (j < vlast) {
            fields += sep;
          }
        }
        if (vlen && i < flast) {
          fields += sep;
        }
      } else {
        fields += ks + decodeURIComponent(v);
        if (i < flast) {
          fields += sep;
        }
      }
    }
    return fields;
  }
  return '';
}

exports.default = {
  stringify: stringify,
  parse: parse
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = __webpack_require__(2);

var _url2 = _interopRequireDefault(_url);

var _querystring = __webpack_require__(0);

var _querystring2 = _interopRequireDefault(_querystring);

var _log = __webpack_require__(3);

var _log2 = _interopRequireDefault(_log);

var _time = __webpack_require__(4);

var _time2 = _interopRequireDefault(_time);

var _cookie = __webpack_require__(5);

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  url: _url2.default,
  querystring: _querystring2.default,
  log: _log2.default,
  time: _time2.default,
  cookie: _cookie2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = __webpack_require__(0);

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function format(url, query) {
  var search = _querystring2.default.stringify(query);
  return url + '?' + search;
}

function parse(url, parseQueryString) {
  var location = {
    hash: null,
    search: null
  };
  if (!url) {
    return '';
  }
  var searchIndex = url.indexOf('?');
  if (searchIndex === -1) {
    return '';
  }
  var hashIndex = url.indexOf('#');
  if (hashIndex > -1) {
    location.hash = url.slice(hashIndex);
    location.search = url.slice(searchIndex, hashIndex);
  } else {
    location.search = url.slice(searchIndex);
  }
  var searchString = location.search.slice(1);
  var query = _querystring2.default.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}

exports.default = {
  format: format,
  parse: parse
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 日志
 */

var LOG = 'LOG';
var INFO = 'INFO';
var WARNING = 'WARNING';
var ERROR = 'ERROR';

var LogType = {
  LOG: LOG,
  INFO: INFO,
  WARNING: WARNING,
  ERROR: ERROR
};

function fillZore(str) {
  var res = '00' + str;
  return res.substring(res.length - 2);
}

var logChannel = function logChannel(logData) {
  var _console, _console2, _console3, _console4;

  var time = fillZore(logData.time.getHours()) + ':' + fillZore(logData.time.getMinutes()) + ':' + fillZore(logData.time.getSeconds());
  switch (logData.type) {
    case LogType.LOG:
      (_console = console).log.apply(_console, ['time:' + time + ' | log: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.INFO:
      (_console2 = console).info.apply(_console2, ['time:' + time + ' | info: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.ERROR:
      (_console3 = console).error.apply(_console3, ['time:' + time + ' | error: '].concat(_toConsumableArray(logData.logArr)));
      break;
    case LogType.WARNING:
      (_console4 = console).warn.apply(_console4, ['time:' + time + ' | warning: '].concat(_toConsumableArray(logData.logArr)));
      break;
    default:
      break;
  }
};

var setLog = function setLog(fn) {
  logChannel = fn;
};

var log = function log(logArr) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogType.LOG;

  logChannel({
    type: type,
    logArr: logArr,
    time: new Date()
  });
};

exports.default = {
  log: log,
  setLog: setLog,
  LogType: LogType
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = time;

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

function time(c) {
  return new Time(c);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function decode(s) {
  return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}

function cookieHandler(key, value, attributes) {
  if (!document) {
    return new Error('Not Found document');
  }
  var write = value !== 'json' && value !== undefined || attributes !== undefined;
  var read = !write;
  if (write) {
    if (!attributes.path) {
      attributes.path = '/';
    }
    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(new Date().getTime() + attributes.expires * 86400000);
    }
    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
    try {
      var r = JSON.stringify(value);
      if (/^[\{\[]/.test(r)) {
        value = r;
      }
    } catch (e) {}
    value = encodeURIComponent(String(value));
    key = encodeURIComponent(String(key));
    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += '; ' + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }
    return document.cookie = key + '=' + value + stringifiedAttributes;
  }
  if (read) {
    var i = 0;
    var jar = Object.create(null);
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var l = cookies.length;
    var json = value === 'json';
    for (; i < l; i++) {
      var parts = cookies[i].split('=');
      var cookie = parts.slice(1).join('=');
      if (!json && cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }
      try {
        var name = decode(parts[0]);
        var cookieVal = decode(cookie);
        if (json) {
          try {
            cookieVal = JSON.parse(cookie);
          } catch (e) {}
        }
        jar[name] = cookieVal;
      } catch (e) {}
    }
    return key ? jar[key] : jar;
  }
}

module.exports = {
  get: function get(key) {
    return cookieHandler(key);
  },
  getJSON: function getJSON(key) {
    return cookieHandler(key, 'json');
  },
  set: function set(key, value) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return cookieHandler(key, value, attributes);
  },
  remove: function remove(key) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    attributes.expires = -1;
    return cookieHandler(key, '', attributes);
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map