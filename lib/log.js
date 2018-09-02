"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogType;
(function (LogType) {
    LogType[LogType["LOG"] = 0] = "LOG";
    LogType[LogType["INFO"] = 1] = "INFO";
    LogType[LogType["WARNING"] = 2] = "WARNING";
    LogType[LogType["ERROR"] = 3] = "ERROR";
})(LogType = exports.LogType || (exports.LogType = {}));
function fillZore(str) {
    var res = '00' + str;
    return res.substring(res.length - 2);
}
var logChannel = function (logData) {
    var time = fillZore(logData.time.getHours())
        + ':' + fillZore(logData.time.getMinutes())
        + ':' + fillZore(logData.time.getSeconds());
    switch (logData.type) {
        case LogType.LOG:
            console.log.apply(console, ['time:' + time + ' | log: '].concat(logData.logArr));
            break;
        case LogType.INFO:
            console.info.apply(console, ['time:' + time + ' | info: '].concat(logData.logArr));
            break;
        case LogType.ERROR:
            console.error.apply(console, ['time:' + time + ' | error: '].concat(logData.logArr));
            break;
        case LogType.WARNING:
            console.warn.apply(console, ['time:' + time + ' | warning: '].concat(logData.logArr));
            break;
        default:
            break;
    }
};
exports.setLog = function (handler) {
    logChannel = handler;
};
exports.log = function (logArr, type) {
    if (type === void 0) { type = LogType.LOG; }
    logChannel({
        type: type,
        logArr: logArr,
        time: new Date(),
    });
};
