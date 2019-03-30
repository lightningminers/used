export interface WeexWXEnvironment {
  platform: string;
}

declare var WXEnvironment: WeexWXEnvironment;
declare var global: any;

export const Browser = typeof window !== 'undefined'
export const Weex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = Weex && WXEnvironment.platform.toLowerCase()

const UA = Browser && window.navigator.userAgent.toLowerCase()

export const IE = UA && /msie|trident/.test(UA)
export const IE9 = UA && UA.indexOf('msie 9.0') > 0
export const Edge = UA && UA.indexOf('edge/') > 0
export const Android = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
export const iOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
export const Chrome = UA && /chrome\/\d+/.test(UA) && !Edge
export const NodeJS = !Browser && !Weex && typeof global !== undefined;