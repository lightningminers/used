const Used = require('../umd/index').default
const {
  url,
  querystring,
  log,
  Time
} = Used;

const time = new Time();
const t_f = time.format();
const t_y = time.format('YYYY-MM')
const t_h = time.format('hh:mm:ss')

console.log('t_f', t_f)
console.log('t_h', t_h)
console.log('t_y', t_y)

const query = {
  id: 1234,
  name: ['你好', '你好']
}

const wu = querystring.stringify(query)
console.log(wu)

const search = 'id=1234&name=你好&name=你好';
const _wu = querystring.parse(search)
console.log(_wu)

const websiteUrl = 'https://github.com/icepy?id=1234&name=你好&name=你好吧'
const _query = url.parse(websiteUrl)
console.log(_query)
const id = url.parse(websiteUrl, 'id')
console.log(id)

const _websiteUrl = url.format('https://github.com/icepy',{
  id: 1234,
  name: '你好'
})
console.log(_websiteUrl)

const logger = log.log;
const LogType = log.LogType;

logger(['123456'])
logger(['error'], LogType.ERROR)
logger(['waring'], LogType.WARNING)
logger(['info'], LogType.INFO)