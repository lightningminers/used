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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  url: _url2.default,
  querystring: _querystring2.default,
  log: _log2.default
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map