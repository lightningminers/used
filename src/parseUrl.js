const urlReg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
const blanks = '       ';
const fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

export default function parseUrl(url, parseQueryString){
  const result = urlReg.exec(url);
  const obj = Object.create(null);
  fields.forEach(function(field, i){
    obj[field] = result[i]
  });
  if (typeof parseQueryString === 'string'){
    return obj[parseQueryString];
  }
  return obj;
}