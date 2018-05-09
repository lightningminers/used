module.exports = function(log){
  const logger = log.log;
  const LogType = log.LogType;

  logger(['123456'])
  logger(['error'], LogType.ERROR)
  logger(['waring'], LogType.WARNING)
  logger(['info'], LogType.INFO)
}