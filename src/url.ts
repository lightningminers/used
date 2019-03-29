import * as querystring from './querystring';

export function format(url: string, query: any): string{
  let search = querystring.stringify(query);
  return `${url}?${search}`;
}

export function parse<T = any>(url: string, parseQueryString?: string): T{
  const wlocation = {
    hash: "",
    search: "",
  };
  const empty = Object.create(null);
  if (!url){
    return empty;
  }
  const searchIndex = url.indexOf('?');
  if (searchIndex === -1){
    return empty;
  }
  const hashIndex = url.indexOf('#');
  if (hashIndex > -1){
    wlocation.hash = url.slice(hashIndex);
    wlocation.search = url.slice(searchIndex, hashIndex);
  } else {
    wlocation.search = url.slice(searchIndex);
  }
  const searchString = wlocation.search.slice(1);
  const query = querystring.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0){
    return query[parseQueryString];
  } else {
    return query;
  }
}