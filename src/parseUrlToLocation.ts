const urlReg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
const blanks: string = '       ';
const fields: string[] = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

export function parseUrlToLocation(url: string, parseQueryString?: string): any{
  const result = urlReg.exec(url);
  const obj = Object.create(null);
  fields.forEach(function(field, i){
    if (result) {
      obj[field] = result[i]
    }
  });
  if (typeof parseQueryString === 'string'){
    return obj[parseQueryString];
  }
  return obj;
}