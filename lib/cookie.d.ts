declare module "browser-used/lib/cookie" {
  export function get(key: string): string;
  export function getJSON(key: string): any;
  export function set(key: string, value: any, attributes?: any): any;
  export function remove(key: string, attributes?: any): any;
}