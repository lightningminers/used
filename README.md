# Used.js

[![Build Status](https://www.travis-ci.org/icepy/used.svg?branch=master)](https://www.travis-ci.org/icepy/used) ![img](https://img.shields.io/github/license/icepy/used.svg) ![img](https://img.shields.io/github/last-commit/icepy/used/master.svg)

> Used.js 是一个轻量级小巧的可运行在浏览器中的 JavaScript 函数库，除个别外大部分的使用方式与 Node.js API 保持一致。

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

- NPM

```bash
$ npm i usedjs --save
```

## 开始

>文档说明以NPM的方式来使用进行

```javascript
import usedjs from 'usedjs' // 全引用
import querystring from 'usedjs/lib/querystring' // 仅引用querystring模块
```

大部分的模块主要针对 `lodash.js` 未提供但又常用到的一些函数并且支持按需载入， **（与热门库使用体验一致）** 简单易用无学习成本。

## API

> 若有不当之处，请指出；

### parseURLString

用于解析字符串URL，如：`https://github.com/icepy/used?id=1234#1`

```javascript
const result = parseURLString('https://github.com/icepy/used?id=1234#1')
```

```json
{
  url: 'https://github.com/icepy/used?id=1234#1',
  scheme: 'https',
  slash: '//',
  host: 'github.com',
  port: undefined,
  path: 'icepy/used',
  query: 'id=1234',
  hash: '1',
}
```

### querystring

处理查询字符串解析和反序列化成字符串，所有的 value 支持编码解码

- parse

使用`parse`将一个符合标准的URL查询字符串，序列化成JSON对象

```javascript
const search = 'id=1234&name=你好&name=你好';
const _wu = querystring.parse(search)
console.log(_wu)
```

```bash
querystring.parse:  { id: '1234', name: [ '你好', '你好' ] }
```

- stringify

使用`stringify`将一组JSON对象，反序列化成URL查询字符串

```javascript
const query = {
  id: 1234,
  name: ['你好', '你好']
}
const wu = querystring.stringify(query)
console.log(wu)
```

```bash
querystring.stringify:  id=1234&name=你好&name=你好
```

### url

支持解析和 `format` 一个符合 URL 规则的 url

- parse

将一个 URL 的查询字符串序列化成 JSON 对象，并且支持获取特定 key 的 value。

```javascript
const websiteUrl = 'https://github.com/icepy?id=1234&name=你好&name=你好吧'
const _query = url.parse(websiteUrl)
console.log(_query)
const id = url.parse(websiteUrl, 'id')
console.log(id)

```

```bash
url.parse:  { id: '1234', name: [ '你好', '你好吧' ] }
url.parse id:  1234
```

- format

将一组 JSON 对象反序列化成 URL 字符串

```javascript
const _websiteUrl = url.format('https://github.com/icepy',{
  id: 1234,
  name: '你好'
})
console.log(_websiteUrl)
```

```bash
url.format:  https://github.com/icepy?id=1234&name=你好
```

### log

良好的日志系统可以在排错方面给予效率，`log`提供了良好的区分以及格式化输出。

- `log` 函数
- `LogType` 常量定义了LOG ERROR WARNING INFO 四个等级

```javascript
const log = logger.log
const LogType = logger.LogType;

log(['123456'])
log(['error'], LogType.ERROR)
log(['waring'], LogType.WARNING)
log(['info'], LogType.INFO)
```

```bash
time:01:26:15 | log:  123456
time:01:26:15 | error:  error
time:01:26:15 | warning:  waring
time:01:26:15 | info:  info
```

## env

用于程序本身判断自己所运行的环境，主要支持 `Browser`，`Node.js`，`Weex`，全部的常量返回一个 `Boolean`。

- `Browser` 是否在浏览器中
- `Weex` 是否在Weex中
- `NodeJS` 是否在Node.js中
- `IE` 是否是IE
- `IE9` 是否是IE9
- `Edge` 是否是Edge
- `Android` 是否是Android（浏览器或Weex）
- `iOS` 是否是iOS（浏览器或Weex）
- `Chrome` 是否是Chrome

```json
{
  Browser: false,
  Weex: false,
  weexPlatform: false,
  IE: false,
  IE9: false,
  Edge: false,
  Android: false,
  iOS: false,
  Chrome: false,
  NodeJS: true
}
```

### Cookie

创建一个cookie应用于整个网站：

```javascript
cookie.set('name', 'icepy')
```

创建一个从现在起7天过期的cookie应用于整个网站：

```javascript
cookie.set('name', 'icepy', { expires:7 })
```

获取一个key=name的cookie：

```javascript
cookie.get('name')
```

获取所有的cookie：

```javascript
cookie.get()
```

删除一个key=name的cookie：

```javascript
cookie.remove('name')
```

> ⚠️注意：删除不存在的cookie不会引发任何异常，也不会有返回值，在删除cookie时最正确的处理方式是将设置cookie时完整的路径和域属性都传递进来。

### createUUID

创建一个 uuid：

```javascript
const uuid = createUUID();
console.log('createUUID: ', uuid);
```

```bash
createUUID:  49bafb3b-4b3f-0aec-66fc-1b13479720a4
```

### compareVersion

版本对比 x.y.z ，旧版本和新版本比对的逻辑是 大于或等于为 true。

```javascript
const cv = compareVersion('1.0.0', '1.0.1');
console.log('oldVersion: 1.0.0 newVersion: 1.0.1', cv);

const cv1 = compareVersion('1.0.0', '1.0.0');
console.log('oldVersion: 1.0.0 newVersion: 1.0.0', cv1);

const cv2 = compareVersion('1.0.0', '0.0.9');
console.log('oldVersion: 1.0.0 newVersion: 0.0.9', cv2);
```

```bash
oldVersion: 1.0.0 newVersion: 1.0.1 true
oldVersion: 1.0.0 newVersion: 1.0.0 true
oldVersion: 1.0.0 newVersion: 0.0.9 false
```