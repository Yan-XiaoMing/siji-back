const path = require('path');
const log4js = require('log4js');
const logPath = process.env.LOG_PAHT || CONFIG.log.path,
    logType = CONFIG.log.type || 'info',
    logLevel = (CONFIG.log.level || 'all').toUpperCase();

console.log(logPath);
console.log(logType);
console.log(logLevel);

// 自定义日志类别
log4js.configure({
    appenders: [{
            type: 'console',
            category: "console"
        }, // 控制台输出
        {
            type: 'file',
            category: 'fileLog',
            filename: path.join(logPath, 'log.log'),
            maxLogSize: 104857600,
            backups: 100
        }, // 单文件输出
        {
            type: 'logLevelFilter',
            level: 'DEBUG',
            category: 'recordRequestTime',
            appender: {
                type: 'file',
                filename: path.join(logPath, 'time.log'),
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
            },
        },
        {
            type: 'logLevelFilter',
            level: 'DEBUG',
            category: 'recordUploadFileError',
            appender: {
                type: 'file',
                filename: path.join(logPath, 'upload.log'),
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
            },
        },
        {
            type: "dateFile",
            category: 'dateFileLog',
            filename: path.join(logPath, 'log'),
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true
        } // 日期格式文件输出
    ],
    replaceConsole: true, //替换console.log
    
});
const logger = log4js.getLogger(logType || 'dateFileLog');
const getLogger = (type) => {
    return log4js.getLogger(type);
}
// 设置日志级别
logger.setLevel(logLevel.toUpperCase());
// 设置日志脱敏
logger.setMask(CONFIG.log.mask);

exports.logger = logger;
exports.getLogger = getLogger;
exports.use = (app) => {
    app.use(log4js.connectLogger(logger, {
        level: 'info',
        format: ':method :url :status :response-timems'
    }));
}