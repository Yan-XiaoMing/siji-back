const requireDirectory = require('require-directory');

const Router = require('koa-router');

class InitManager{
    static initCore(app){
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig();
        // InitManager.loadLog4js();
    }

    static loadConfig(path=''){
        const configPath = path || process.cwd()+'/config/config.js';
        const config = require(configPath);
        global.config = config;
    }

    static initLoadRouters(){
         requireDirectory(module, '../app/api/', {
            visit: whenLoadMoudule
        })

        function whenLoadMoudule(obj) {
            if (obj instanceof Router) {
                // console.log(obj);
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadHttpException(){
        const errors = require('./http-exception');
        global.error = errors;
    }

    // static loadLog4js(){
    //     global.CONFIG = require('../config/config').log;
    //     // 日志对象
    //     const log = require('../config/log');
    //     global.LOG = log.logger;
    //     global.TIMELOG = log.getLogger('recordRequestTime');
    //     global.UPLOADERROR = log.getLogger('recordUploadFileError');
    // }
}
module.exports = InitManager