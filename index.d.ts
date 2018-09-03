interface IEnv {
  inBrowser: boolean;
  inWeex: boolean;
  weexPlatform: string;
  isIE: boolean;
  isIE9: boolean;
  isEdge: boolean;
  isAndroid: boolean;
  isiOS: boolean;
  isChrome: boolean;
  inNodeJS: boolean;
}

interface ICookie {
  get(key: string): string;
  getJSON(key: string): any;
  set(key: string, value: any, attributes?: any): any;
  remove(key: string, attributes?: any): any;
}

declare class Time {
  constructor(c: any);
  isValid(): boolean;
  unix(): number;
  valueOf(): number;
  clone(): Time;
  format(str: string): string;
}

interface IDate {
  time: (c: any) => Time;
}

declare enum IndexLogType {
  LOG = 0,
  INFO,
  WARNING,
  ERROR,
}

interface ILog {
  type: IndexLogType;
  logArr: Array<any>;
  time: Date;
}

interface ILogger {
  setLog(handler: (logData: ILog) => void): void;
  log(logArr: any[], type?: string): void;
  LogType: IndexLogType;
}

interface IQueryString {
  parse(qs: string, sep?: string, eq?: string): any;
  stringify(obj: any, sep?: string, eq?: string): string;
}

interface IUrl {
  format(url: string, query: string): string;
  parse(url: string, parseQueryString?: string): any;
}

declare module "browser-used" {
  export function parseUrlToLocation(url: string, parseQueryString?: string): any;
  export var env: IEnv;
  export var url: IUrl;
  export var querystring: IQueryString;
  export var log: ILogger;
  export var date: IDate;
  export var cookie: ICookie;
}

