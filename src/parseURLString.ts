const urlReg = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
const blanks: string = '       ';
const fields: string[] = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

export interface IURL {
  url: string;
  scheme: string;
  slash: string;
  host: string;
  port: string;
  hash: string;
  query: string;
}

/**
 * 解析字符串 URL
 * @param url 
 * @param parseQueryString 可选
 */
export default function parseURLString<T = any>(url: string, parseQueryString?: string): T{
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