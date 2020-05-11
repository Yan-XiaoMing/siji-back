const requireDirectory = require('require-directory');

const Router = require('koa-router');

class InitManager{
    static initCore(app){
        InitManager.app = app;
        InitManager.initLoadRouters();
    }

    static initLoadRouters(){
         requireDirectory(module, '../app/api/v1', {
            visit: whenLoadMoudule
        })

        function whenLoadMoudule(obj) {
            if (obj instanceof Router) {
                // console.log(obj);
                InitManager.app.use(obj.routes())
            }
        }
}