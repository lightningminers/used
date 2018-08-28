const Used = require('../umd/index').default
console.log(Used);
const {
  url,
  querystring,
  log,
  date,
  cookie,
  env
} = Used;

const log_test = require('./log_test');
const querystring_test = require('./querystring_test');
const time_test = require('./time_test');
const url_test = require('./url_test');
const cookie_test = require('./cookie_test');
const env_test = require('./env_test');

log_test(log)
querystring_test(querystring)
time_test(date.time)
url_test(url)
cookie_test(cookie)
env_test(env);

