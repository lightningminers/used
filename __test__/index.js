const parseURLString = require('../lib/parseURLString').default;
const querystring = require('../lib/querystring');
const url = require('../lib/url');
const logger = require('../lib/log');
const env = require('../lib/env');
const cookie = require('../lib/cookie');
const createUUID = require('../lib/createUUID').default;
const compareVersion = require('../lib/compareVersion').default;
const is = require('../lib/is');

/// parseURLString
const result = parseURLString('https://github.com/icepy/used?id=1234#1')
console.log('parseURLString: ', result);
///


/// querystring
const search = 'id=1234&name=你好&name=你好';
const _wu = querystring.parse(search);
console.log('querystring.parse: ', _wu);

const query = {
  id: 1234,
  name: ['你好', '你好']
};
const wu = querystring.stringify(query);
console.log('querystring.stringify: ', wu);
///

/// url
const websiteUrl = 'https://github.com/icepy?id=1234&name=你好&name=你好吧'
const _query = url.parse(websiteUrl)
console.log('url.parse: ',_query)
const id = url.parse(websiteUrl, 'id')
console.log('url.parse id: ',id)

const _websiteUrl = url.format('https://github.com/icepy',{
  id: 1234,
  name: '你好'
})
console.log('url.format: ', _websiteUrl)
///

/// log
const log = logger.log
const LogType = logger.LogType;

log(['123456'])
log(['error'], LogType.ERROR)
log(['waring'], LogType.WARNING)
log(['info'], LogType.INFO)
///

/// env
console.log('env: ',env);
///

/// cookie
global.document = {}
global.document.cookie = '_octo=GH1.1.80487450.1502632996; _ga=GA1.2.150348890.1502633060; tz=Asia%2FShanghai';

console.log('_octo', cookie.get('_octo'))
console.log('_ga', cookie.get('_ga'))
console.log('_ga', cookie.getJSON('_ga'))
console.log('tz', cookie.get('tz'))
console.log(cookie.get())
console.log(document.cookie)
///

/// create uuid

const uuid = createUUID();
console.log('createUUID: ', uuid);

///

/// compareVersion x.y.z

/// 大于或等于

const cv = compareVersion('1.0.0', '1.0.1');
console.log('oldVersion: 1.0.0 newVersion: 1.0.1', cv);

const cv1 = compareVersion('1.0.0', '1.0.0');
console.log('oldVersion: 1.0.0 newVersion: 1.0.0', cv1);

const cv2 = compareVersion('1.0.0', '0.0.9');
console.log('oldVersion: 1.0.0 newVersion: 0.0.9', cv2);
///

/// is

console.log('empty object', is.emptyObject({}));

///