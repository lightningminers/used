const RUNTIME = {
  WEB: 'Web',
  WEEX: 'Weex',
  UNKNOWN: 'Unknown'
}
const FRAMEWORK = {
  VUE: 'Vue',
  RAX: 'Rax',
  UNKNOWN: 'Unknown'
};
const PLATFORM = {
  IOS: 'iOS',
  ANDROID: 'Android',
  IPAD: 'iPad',
  UNKNOWN: 'Unknown'
}

const maybeInWebView = typeof window !== 'undefined';
const maybeInWeexVueEnv = typeof weex !== 'undefined';
const maybeInNative = typeof callNative !== 'undefined';
const snifferWeexRaxMap = [
  '__weex_config__',
  '__weex_options__',
  '__weex_require__'
];
const snifferWebViewMap = [
  'localStorage',
  'location',
  'navigator',
  'XMLHttpRequest'
];
const snifferWeexVueMap = [
  'config',
  'requireModule',
  'document'
];

// 嗅探器
function snifferMachine(snifferMap,source){
  const j = snifferMap.length;
  let i = 0;
  let result = true;
  for(;i < j; i++){
    if (!source[snifferMap[i]]){
      result = false;
      break;
    }
  }
  return result;
}

function whichOneRuntime(){
  if (maybeInWebView && maybeInWeexVueEnv){
    // webview
    return snifferMachine(snifferWeexVueMap,weex) ? 'Web.Vue' : 'Web.Unknown';
  } else if (!maybeInWebView && maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexVueMap,weex) ? 'Weex.Vue' : 'Weex.Unknown';
  } else if (maybeInWebView && maybeInNative && !maybeInWeexVueEnv){
    // native
    return snifferMachine(snifferWeexRaxMap,window) ? 'Weex.Rax' : 'Weex.Unknown';
  } else {
    // default webview
    if (maybeInWebView){
      return snifferMachine(snifferWebViewMap,window) ? 'Web.Unknown' : 'Unknown.Unknown';
    } 
  }
  return 'Unknown.Unknown';
}

function getVirtualEnv(){
  let containerEnv = {};
  switch (framework){
    case FRAMEWORK.VUE:
        const config = weex.config;
        const env = config.env;
        containerEnv.platform = env.platform;
        if (RUNTIME.WEEX === runtime){
          containerEnv.appVersion = env.appVersion;
          containerEnv.appName = env.appName;
        }
      break;
    case FRAMEWORK.RAX:
        if (RUNTIME.WEEX === runtime) {
          containerEnv.platform = navigator.platform;
          containerEnv.appName = navigator.appName;
          containerEnv.appVersion = navigator.appVersion;
        }
      break;
    case FRAMEWORK.UNKNOWN:
        if (RUNTIME.WEB === runtime){
          containerEnv.platform = RUNTIME.WEB;
        }
        if (RUNTIME.UNKNOWN === runtime){
          containerEnv.platform = RUNTIME.UNKNOWN;
        }        
      break;
  }  
  return containerEnv;
}

function environment(runtime,framework,virtualEnv){
  const isWeb = virtualEnv.platform === 'Web';
  const isWeexiOS = virtualEnv.platform === 'iOS';
  const isWeexAndroid = virtualEnv.platform === 'android';
  const isWeex = isWeexAndroid || isWeexiOS;
  const UA = (() => {
    if(isWeb){
      return window.navigator.userAgent.toLowerCase();
    }
    return '';
  })();
  const isWebiOS = /iphone|ipod|ios/.test(UA);
  const isiPad = /ipad/.test(UA);
  const isWebAndroid = UA.indexOf('android') > -1;
  let platform = '';
  if (isWebiOS || isWeexiOS){
    platform = PLATFORM.IOS;
  } else if (isWebAndroid || isWeexAndroid){
    platform = PLATFORM.ANDROID;
  } else if (isiPad){
    platform = PLATFORM.IPAD;
  } else {
    platform = PLATFORM.UNKNOWN;
  }
  return {
    isWebiOS,
    isWebAndroid,
    isWeexiOS,
    isWeexAndroid,
    isiPad,
    runtime,
    framework,
    platform
  }
}

const [ runtime, framework ] = whichOneRuntime().split('.');
const virtualEnv = getVirtualEnv();
const env = environment(runtime,framework,virtualEnv);

export default env;