[![Build Status](https://www.travis-ci.org/icepy/used.svg?branch=master)](https://www.travis-ci.org/icepy/used)

> Used.js是一个轻量级小巧的可运行在浏览器中的JavaScript函数库，除个别外大部分的使用方式与Node.js API保持一致。

- 更轻量小巧
- 可按需载入
- 丰富的API
- 提高开发效率
- 全浏览器兼容

## 编译

```bash
$ yarn
$ npm run build
```

## 安装

可以用两种方式来使用Used.js:

- NPM

```bash
$ npm i browser-used --save
```

- SCRIPT 标签

将`umd`目录中的资源放到任意的CDN中，使用`<script src=""></script>`的方式引入。

## 开始

>文档说明以NPM的方式来使用进行

```JavaScript
import Used from 'browser-used' // 全引用
import Time from 'browser-used/lib/time' // 仅引用Time模块
import querystring from 'browser-used/lib/querystring' // 仅引用querystring模块
```

大部分的模块主要针对`lodash.js`未提供但又常用到的一些函数，并且支持按需载入，个别模块如`Time`的使用和 Moment.js 的API，用法相同， **（保证和热门库使用体验一致）** 无学习成本。

# API

若有不当之处，请指出；

## Time

初始化一个`Time`支持多种传入参数的方式：

- 无参数，将得到一个包含当前时间和日期的`time`对象
- 标准的ISO 8601时间字符串，如: `time('2018-05-04')`
- Unix 时间戳，如: `time(1525793309344)`
- Date对象，如: `time(new Date())`

#### Time Property

- `y` 年
- `m` 月
- `d` 日
- `w` 星期几
- `h` 小时
- `hm` 分钟
- `hms` 秒
- `hmss` 毫秒
 
#### Time Method

- `isValid` return Boolean

`isValid` 检查当前的`Time`对象是否是一个有效的时间对象。

```JavaScript
time().isValid()
```

- `clone` return Time Object

`clone` 返回一个包含当前对象的拷贝

```JavaScript
time().clone()
```

- `unix` return number

`unix` 返回Unix时间戳（秒）

- `valueOf` return number

`valueOf` 返回Unix时间戳（毫秒）

- `format` return string

`format` 格式化日期

```JavaScript
time().format('YYYY-MM')
time().format('hh:mm:ss')
```

转换格式如下：

| Format | Output | Description |
| ------ | ------ | ----------- |
| `YYYY` | 2018 | 四位数的年份 |
| `MM` | 01-12 | 月份，数字前面加上0 |
| `DD` | 01-31 | 月份里的一天，数字前面加上0 |
| `hh` | 00-23 | 小时，数字前面加上0 |
| `mm` | 00-59 | 分钟，数字前面加上0 |
| `ss` | 00-59 | 秒，数字前面加上0 |
| `a` | 'am' 'pm' | 12时制转换日期格式小写 |
| `A` | 'AM' 'PM' | 12时制转换日期格式大写 |

- `isBefore` return Boolean

`isBefore` 检查一个`Time`对象是否在另一个`Time`对象的时间之前

```JavaScript
time().isBefore(time())
```

- `isAfter` return Boolean

`isAfter` 检查一个`Time`对象是否在另一个`Time`对象的时间之后

```JavaScript
time().isAfter(time())
```

- `isSame` return Boolean

`isSame` 检查一个`Time`对象是否与另外一个`Time`对象时间相同

- `isLeapYear` return Boolean

`isLeapYear` 判断闰年

- `daysInMonth` return number

`daysInMonth` 返回某年某月有多少天

- `add` return new Time()

`add` 提供了操作时间的方式

```JavaScript
const M = t.add(2019,'Y').format()
console.log(M);
```

单位格式：

| 单位 | Output |
| ------ | ------ |
| `Y` | 年 | 
| `M` | 月 | 
| `w` | 周 | 
| `d` | 天 | 
| `h` | 小时 | 
| `m` | 分钟 | 


## url

支持解析和`format`一个符合URL规则的URL

#### parse

将一个URL的查询字符串序列化成JSON对象，并且支持获取特定key的value。

```JavaScript
const websiteUrl = 'https://github.com/icepy?id=1234&name=你好&name=你好吧'
const _query = url.parse(websiteUrl)
console.log(_query)
const id = url.parse(websiteUrl, 'id')
console.log(id)

```

#### format

将一组JSON对象反序列化成URL字符串

```JavaScript
const _websiteUrl = url.format('https://github.com/icepy',{
  id: 1234,
  name: '你好'
})
console.log(_websiteUrl)
```

## querystring

处理查询字符串解析和反序列化成字符串，所有的value支持编码解码

#### parse

使用`parse`将一个符合标准的URL查询字符串，序列化成JSON对象

```JavaScript
const search = 'id=1234&name=你好&name=你好';
const _wu = querystring.parse(search)
console.log(_wu)
```

#### stringify

使用`stringify`将一组JSON对象，反序列化成URL查询字符串

```JavaScript
const query = {
  id: 1234,
  name: ['你好', '你好']
}
const wu = querystring.stringify(query)
console.log(wu)
```

## log

良好的日志系统可以在排错方面给予效率，`log`提供了良好的区分以及格式化输出。

```JavaScript
  const logger = log.log;
  const LogType = log.LogType;

  logger(['123456'])
  logger(['error'], LogType.ERROR)
  logger(['waring'], LogType.WARNING)
  logger(['info'], LogType.INFO)
```

- `log` 函数
- `LogType` 常量定义了LOG ERROR WARNING INFO 四个等级

## Cookie

创建一个cookie应用于整个网站：

```JavaScript
cookie.set('name', 'icepy')
```

创建一个从现在起7天过期的cookie应用于整个网站：

```JavaScript
cookie.set('name', 'icepy', { expires:7 })
```

获取一个key=name的cookie：

```JavaScript
cookie.get('name')
```

获取所有的cookie：

```JavaScript
cookie.get()
```

删除一个key=name的cookie：

```JavaScript
cookie.remove('name')
```

> ⚠️注意：删除不存在的cookie不会引发任何异常，也不会有返回值，在删除cookie时最正确的处理方式是将设置cookie时完整的路径和域属性都传递进来。

## env

用于程序本身判断自己所运行的环境，主要支持`Browser`，`Node.js`，`Weex`，全部的常量返回一个`Boolean`。

- `inBrowser` 是否在浏览器中
- `inWeex` 是否在Weex中
- `inNodeJS` 是否在Node.js中
- `isIE` 是否是IE
- `isIE9` 是否是IE9
- `isEdge` 是否是Edge
- `isAndroid` 是否是Android（浏览器或Weex）
- `isiOS` 是否是iOS（浏览器或Weex）
- `isChrome` 是否是Chrome

## parseUrlToLocation

用于解析字符串URL，如：`https://github.com/icepy?id=1234/#hash`

```JavaScript
{
  "url":"https://github.com/icepy?id=1234/#hash",
  "scheme":"https",
  "slash":"//",
  "host":"github.com",
  "path":"icepy",
  "query":"id=1234/",
  "hash":"hash"
}
```
