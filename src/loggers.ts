/**
 * 根据 https://developer.mozilla.org/zh-CN/docs/Web/API/Console 提供相应的等级日志
 * 前四个类型属于消息输出，主要针对文本 String
 * DIR 针对 DOM
 * TABLE 针对 Object | Array
 */

export enum LoggerType {
  LOG = "log",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  DIR = "dir",
  TABLE = "table"
}

interface IPrint{
  type: LoggerType;
  message: any[];
  timeTag: string;
  options?: string[];
}

const fillZore = (str: number): string => {
  const res = '00' + str;
  return res.substring(res.length - 2);
}

const printFunc = (timeTag: string, type: string) => {
  return `time: ${timeTag} | ${type}: `;
}

const func = (internal: IPrint) => {
  const { type, message, timeTag } = internal;
  const str = printFunc(timeTag, type);
  switch(type) {
    case LoggerType.LOG: {
      console.log(str, ...message);
      break;
    }
    case LoggerType.INFO: {
      console.info(str, ...message);
      break;
    }
    case LoggerType.WARNING: {
      console.warn(str, ...message);
      break;
    }
    case LoggerType.ERROR: {
      console.error(str, ...message);
      break;
    }
  }
}

const funcDir = (message: Element) => {
  console.dir(message);
}

const funcTable = (message: any, options?:string[]) => {
  if (options) {
    console.table(message, options);
  } else {
    console.table(message);
  }
}

const channel = (message: any, type = LoggerType.INFO, options?: string[]) => {
  const time = new Date();
  const timeTag = `${fillZore(time.getHours())}:${fillZore(time.getMinutes())}:${fillZore(time.getSeconds())}`;
  if (type === LoggerType.LOG || type === LoggerType.INFO || type === LoggerType.WARNING || type === LoggerType.ERROR) {
    func({
      type,
      timeTag,
      message,
      options,
    });
  } else if (type === LoggerType.DIR) {
    funcDir(message);
  } else if (type === LoggerType.TABLE) {
    funcTable(message, options);
  } else {
    console.error("暂时不支持这种类型的日志");
  }
}

export const dir = (el: Element) => {
  logger(el, LoggerType.DIR);
}

export const info = (message: any) => {
  logger(message, LoggerType.INFO);
}

export const warning = (message: any) => {
  logger(message, LoggerType.WARNING);
}

export const error = (message: any) => {
  logger(message, LoggerType.ERROR);
}

export const table = (message: any, options?: string[]) => {
  logger(message, LoggerType.TABLE, options);
}

const logger = (message: any, type = LoggerType.LOG, options?: string[]) => {
  channel(message, type, options);
}

export default logger;