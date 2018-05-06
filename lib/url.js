'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('./querystring');

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
//# sourceMappingURL=url.js.map