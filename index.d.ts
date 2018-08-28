declare module "browser-used/lib/cookie" {
  function get(key: string): string;
  function getJSON(key: string): any;
  function set(key: string, value: any, attributes: any): any;
  function remove(key: string, attributes: any): any;
}

declare module "browser-used/lib/env" {
  
}

interface ILogType {
  LOG: string;
  INFO: string;
  WARNING: string;
  ERROR: string;
}

declare module "browser-used/lib/log" {
  function setLog(fn: Function): void;
  function log(logArr: string[], type: string): void;
  var LogType: ILogType;
}

declare module "browser-used/lib/parseUrlToLocation" {
  function parseUrlToLocation(url: string, parseQueryString?: string): any;
}

declare module "browser-used/lib/querystring" {
  function parse(qs: string, sep?: string, eq?: string): any;
  function stringify(obj: any, sep?: string, eq?: string): string;
}

declare class Time {
  constructor(c: any);
  isValid(): boolean;
  unix(): number;
  valueOf(): number;
  clone(): Time;
  format(str: string): string;
}

declare module "browser-used/lib/time" {
  function time(c: any): void;
}

declare module "browser-used/lib/url" {
  function format(url: string, query: string): string;
  function parse(url: string, parseQueryString?: string): any;
}





