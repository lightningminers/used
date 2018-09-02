import * as querystring from './querystring';

export function format(url: string, query: any): string{
  let search = querystring.stringify(query);
  return `${url}?${search}`;
}

export function parse(url: string, parseQueryString?: string): any{
  let wlocation = {
    hash: "",
    search: "",
  };
  if (!url){
    return '';
  }
  const searchIndex = url.indexOf('?');
  if (searchIndex === -1){
    return '';
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