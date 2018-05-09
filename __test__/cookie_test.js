global.document = {}
global.document.cookie = '_octo=GH1.1.80487450.1502632996; _ga=GA1.2.150348890.1502633060; tz=Asia%2FShanghai';

module.exports = function(cookie){
  console.log('_octo', cookie.get('_octo'))
  console.log('_ga', cookie.get('_ga'))
  console.log('tz', cookie.get('tz'))
  console.log(cookie.get())
  console.log(document.cookie)
}