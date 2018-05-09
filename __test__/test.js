const Used = require('../umd/index').default
const {
  url,
  querystring,
  log,
  time,
  cookie
} = Used;

const log_test = require('./log_test');
const querystring_test = require('./querystring_test');
const time_test = require('./time_test');
const url_test = require('./url_test');
const cookie_test = require('./cookie_test');

log_test(log)
querystring_test(querystring)
time_test(time)
url_test(url)
cookie_test(cookie)

