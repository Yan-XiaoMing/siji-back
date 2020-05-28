const requireDirectory = require('require-directory');

const Router = require('koa-router');

class InitManager {
    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig();
        InitManager.formatDate();
        // InitManager.loadLog4js();
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }

    static initLoadRouters() {
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

    static loadHttpException() {
        const errors = require('./http-exception');
        global.error = errors;
    }

    static formatDate() {
        Date.prototype.Format = function (fmt) { //author: meizz   
            var o = {
                "M+": this.getMonth() + 1, //月份   
                "d+": this.getDate(), //日   
                "h+": this.getHours(), //小时   
                "m+": this.getMinutes(), //分   
                "s+": this.getSeconds(), //秒   
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
                "S": this.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
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