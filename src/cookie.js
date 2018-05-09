function decode(s){
  return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}

function cookieHandler(key, value, attributes){
  if (!document){
    return new Error('Not Found document')
  }
  const write = (value !== 'json' && value !== undefined) || attributes !== undefined;
  const read = !write;
  if (write){
    if (!attributes.path){
      attributes.path = '/';
    }
    if (typeof attributes.expires === 'number'){
      attributes.expires = new Date(new Date().getTime() + attributes.expires * 86400000);
    }
    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
    try{
      const r = JSON.stringify(value);
      if (/^[\{\[]/.test(r)){
        value = r;
      }
    }catch(e){}
    value = encodeURIComponent(String(value));
    key = encodeURIComponent(String(key));
    let stringifiedAttributes = '';
    for (let attributeName in attributes){
      if (!attributes[attributeName]){
        continue;
      }
      stringifiedAttributes += '; ' + attributeName;
      if (attributes[attributeName] === true){
        continue;
      }
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }
    return document.cookie = key + '=' + value + stringifiedAttributes;
  } 
  if (read){
    let i = 0;
    const jar = Object.create(null);
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const l = cookies.length;
    const json = value === 'json';
    for (; i < l; i ++){
      const parts = cookies[i].split('=');
      let cookie = parts.slice(1).join('=');
      if (!json && cookie.charAt(0) === '"'){
        cookie = cookie.slice(1, -1);
      }
      try{
        const name = decode(parts[0]);
        let cookieVal = decode(cookie);
        if (json){
          try{
            cookieVal = JSON.parse(cookie)
          } catch(e){}
        }
        jar[name] = cookieVal;
      }catch(e){}
    }
    return key ? jar[key] : jar;
  }
}

module.exports = {
  get(key){
    return cookieHandler(key);
  },
  getJSON(key){
    return cookieHandler(key, 'json');
  },
  set(key, value, attributes={}){
    return cookieHandler(key, value, attributes);
  },
  remove(key, attributes={}){
    attributes.expires = -1;
    return cookieHandler(key, '', attributes)
  }
}