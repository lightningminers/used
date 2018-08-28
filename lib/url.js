'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.parse = parse;

var _querystring = require('./querystring');

var querystring = _interopRequireWildcard(_querystring);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function format(url, query) {
  var search = querystring.stringify(query);
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
  var query = querystring.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}
//# sourceMappingURL=url.js.map