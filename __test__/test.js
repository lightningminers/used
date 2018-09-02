const log = require("../lib/log");
const querystring = require("../lib/querystring");
const date = require("../lib/date");
const url = require("../lib/url");
const cookie = require("../lib/cookie");
const env = require("../lib/env");

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

console.log(log)