'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var RUNTIME = {
  WEB: 'Web',
  WEEX: 'Weex',
  UNKNOWN: 'Unknown'
};
var FRAMEWORK = {
  VUE: 'Vue',
  RAX: 'Rax',
  UNKNOWN: 'Unknown'
};
var PLATFORM = {
  IOS: 'iOS',
  ANDROID: 'Android',
  IPAD: 'iPad',
  UNKNOWN: 'Unknown'
};

var maybeInWebView = typeof window !== 'undefined';
var maybeInWeexVueEnv = typeof weex !== 'undefined';
var maybeInNative = typeof callNative !== 'undefined';
var snifferWeexRaxMap = ['__weex_config__', '__weex_options__', '__weex_require__'];
var snifferWebViewMap = ['localStorage', 'location', 'navigator', 'XMLHttpRequest'];
var snifferWeexVueMap = ['config', 'requireModule', 'document'];

// 嗅探器
function snifferMachine(snifferMap, source) {
  var j = snifferMap.length;
  var i = 0;
  var result = true;
  for (; i < j; i++) {
    if (!source[snifferMap[i]]) {
      result = false;
      break;
    }
  }
  return result;
}

function whichOneRuntime() {
  if (maybeInWebView && maybeInWeexVueEnv) {
    // webview
    return snifferMachine(snifferWeexVueMap, weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexVueMap, weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv) {
    // native
    return snifferMachine(snifferWeexRaxMap, window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView) {
      return snifferMachine(snifferWebViewMap, window) ? 'Web.Unknown' : 'Unknown.Unknown';
    }
  }
  return 'Unknown.Unknown';
}

function getVirtualEnv() {
  var containerEnv = {};
  switch (framework) {
    case FRAMEWORK.VUE:
      var config = weex.config;
      var _env = config.env;
      containerEnv.platform = _env.platform;
      if (RUNTIME.WEEX === runtime) {
        containerEnv.appVersion = _env.appVersion;
        containerEnv.appName = _env.appName;
      }
      break;
    case FRAMEWORK.RAX:
      if (RUNTIME.WEEX === runtime) {
        containerEnv.platform = navigator.platform;
        containerEnv.appName = navigator.appName;
        containerEnv.appVersion = navigator.appVersion;
      }
      break;
    case FRAMEWORK.UNKNOWN:
      if (RUNTIME.WEB === runtime) {
        containerEnv.platform = RUNTIME.WEB;
      }
      if (RUNTIME.UNKNOWN === runtime) {
        containerEnv.platform = RUNTIME.UNKNOWN;
      }
      break;
  }
  return containerEnv;
}

function environment(runtime, framework, virtualEnv) {
  var isWeb = virtualEnv.platform === 'Web';
  var isWeexiOS = virtualEnv.platform === 'iOS';
  var isWeexAndroid = virtualEnv.platform === 'android';
  var isWeex = isWeexAndroid || isWeexiOS;
  var UA = function () {
    if (isWeb) {
      return window.navigator.userAgent.toLowerCase();
    }
    return '';
  }();
  var isWebiOS = /iphone|ipod|ios/.test(UA);
  var isiPad = /ipad/.test(UA);
  var isWebAndroid = UA.indexOf('android') > -1;
  var platform = '';
  if (isWebiOS || isWeexiOS) {
    platform = PLATFORM.IOS;
  } else if (isWebAndroid || isWeexAndroid) {
    platform = PLATFORM.ANDROID;
  } else if (isiPad) {
    platform = PLATFORM.IPAD;
  } else {
    platform = PLATFORM.UNKNOWN;
  }
  return {
    isWebiOS: isWebiOS,
    isWebAndroid: isWebAndroid,
    isWeexiOS: isWeexiOS,
    isWeexAndroid: isWeexAndroid,
    isiPad: isiPad,
    runtime: runtime,
    framework: framework,
    platform: platform
  };
}

var _whichOneRuntime$spli = whichOneRuntime().split('.'),
    _whichOneRuntime$spli2 = _slicedToArray(_whichOneRuntime$spli, 2),
    runtime = _whichOneRuntime$spli2[0],
    framework = _whichOneRuntime$spli2[1];

var virtualEnv = getVirtualEnv();
var env = environment(runtime, framework, virtualEnv);

exports.default = env;
//# sourceMappingURL=env.js.map