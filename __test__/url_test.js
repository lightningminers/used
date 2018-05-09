module.exports = function(url){
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
}