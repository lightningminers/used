declare module "browser-used/lib/querystring" {
  export function parse(qs: string, sep?: string, eq?: string): any;
  export function stringify(obj: any, sep?: string, eq?: string): string;
}