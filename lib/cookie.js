'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getJSON = getJSON;
exports.set = set;
exports.remove = remove;
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

function get(key) {
  return cookieHandler(key);
}

function getJSON(key) {
  return cookieHandler(key, 'json');
}

function set(key, value) {
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return cookieHandler(key, value, attributes);
}

function remove(key) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  attributes.expires = -1;
  return cookieHandler(key, '', attributes);
}
//# sourceMappingURL=cookie.js.map