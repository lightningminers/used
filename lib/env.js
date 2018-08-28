'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var inBrowser = exports.inBrowser = typeof window !== 'undefined';
var inWeex = exports.inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = exports.weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = exports.isIE = UA && /msie|trident/.test(UA);
var isIE9 = exports.isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = exports.isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isiOS = exports.isiOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = exports.isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var inNodeJS = exports.inNodeJS = !inBrowser && !inWeex && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) !== undefined;
//# sourceMappingURL=env.js.map