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


declare enum LogType {
  LOG = 0,
  INFO,
  WARNING,
  ERROR,
}

interface ILog {
  type: LogType;
  logArr: Array<any>;
  time: Date;
}

interface ILogger {
  setLog(fn: (logData: ILog) => void): void;
  log(logArr: any[], type?: string): void;
  LogType: LogType;
}

interface IQueryString {
  parse(qs: string, sep?: string, eq?: string): any;
  stringify(obj: any, sep?: string, eq?: string): string;
}

interface IUrl {
  format(url: string, query: string): string;
  parse(url: string, parseQueryString?: string): any;
}

interface IUsed {
  env: IEnv;
  cookie: ICookie;
  date: IDate;
  log: ILogger;
  parseUrlToLocation(url: string, parseQueryString?: string): any;
  querystring: IQueryString;
  url: IUrl;
}

export declare var Used: IUsed