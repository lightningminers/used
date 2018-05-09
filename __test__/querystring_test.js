module.exports = function(querystring){
  const query = {
    id: 1234,
    name: ['你好', '你好']
  }
  const wu = querystring.stringify(query)
  console.log(wu)
  const search = 'id=1234&name=你好&name=你好';
  const _wu = querystring.parse(search)
  console.log(_wu)
}