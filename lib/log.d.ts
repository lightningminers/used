
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

declare module "browser-used/lib/log" {
  export function setLog(handler: (logData: ILog) => void): void;
  export function log(logArr: any[], type?: string): void;
  export var LogType: LogType;
}
