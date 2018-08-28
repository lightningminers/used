interface ILogType {
  LOG: string;
  INFO: string;
  WARNING: string;
  ERROR: string;
}

declare module "browser-used/lib/log" {
  export function setLog(fn: Function): void;
  export function log(logArr: string[], type: string): void;
  export var LogType: ILogType;
}
