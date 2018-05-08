[![Build Status](https://www.travis-ci.org/icepy/used.svg?branch=master)](https://www.travis-ci.org/icepy/used)

> Used.js是一个轻量级小巧的可运行在浏览器中的JavaScript函数库，除个别外大部分的使用方式与Node.js API保持一致。

- 更轻量小巧
- 可按需载入
- 丰富的API
- 提高开发效率
- 全浏览器兼容

## 安装

可以用两种方式来使用Used.js:

- NPM

```bash
$ npm i browser-used --save
```

- SCRIPT 标签

将`umd`目录中的资源放到任意的CDN中，使用`<script src=""></script>`的方式引入。

## 开始

>文档说明以NPM的方式来使用如果

```JavaScript
import Used from 'browser-used' // 全引用
import Time from 'browser-used/lib/time' //仅引用Time模块
import querystring from 'browser-used/lib/querystring' // 仅引用querystring模块
```

大部分的模块主要针对`lodash.js`未提供但又常用到的一些函数，并且支持按需载入，个别模块如`Time`的使用和 Moment.js 的API，用法相同， **（保证和热门库使用体验一致）** 无学习成本。

## API

---

### 处理时间

初始化一个`Time`支持多种传入参数的方式：

- 无参数，将得到一个包含当前时间和日期的`time`对象
- 标准的ISO 8601时间字符串，如: `new Time('2018-05-04')`
- Unix 时间戳，如: `new Time(1525793309344)`
- Date对象，如: `new Time(new Date())`

#### Time Method

- `isValid` return Boolean

`isValid` 检查当前的`Time`对象是否是一个有效的时间对象。

```JavaScript
const time = new Time()
time.isValid()
```

- `clone` return Time Object

`clone` 返回一个包含当前对象的拷贝

```JavaScript
const time = new Time()
time.clone()
```

### 处理URL

支持解析和`format`一个符合URL规则的URL

#### 解析

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

### 处理查询字符串

处理查询字符串解析和反序列化成字符串，所有的value支持编码解码

#### 解析

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

### 日志

