declare module "browser-used/lib/url" {
  export function format(url: string, query: string): string;
  export function parse(url: string, parseQueryString?: string): any;
}