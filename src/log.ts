export enum LogType {
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

function fillZore(str: number): string {
  const res = '00' + str;
  return res.substring(res.length - 2);
}

let logChannel = (logData: ILog) => {
  const time = fillZore(logData.time.getHours())
      + ':' + fillZore(logData.time.getMinutes())
      + ':' + fillZore(logData.time.getSeconds());
  switch (logData.type) {
    case LogType.LOG:
        console.log('time:'+ time +' | log: ', ...logData.logArr);
      break;
    case LogType.INFO:
        console.info('time:'+ time + ' | info: ', ...logData.logArr);
      break;
    case LogType.ERROR:
        console.error('time:'+ time +' | error: ', ...logData.logArr);
      break;
    case LogType.WARNING:
        console.warn('time:'+ time +' | warning: ', ...logData.logArr);
      break;
    default:
      break;
  }
};

export const setLog = (handler: (logData: ILog) => void) => {
  logChannel = handler;
};

export const log = (logArr: any[], type = LogType.LOG) => {
  logChannel({
    type,
    logArr,
    time: new Date(),
  });
};