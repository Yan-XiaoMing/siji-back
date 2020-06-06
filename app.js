const Koa = require('koa')
const parser = require('koa-bodyparser');
const catchError = require('./middlewares/exception');
const server = require('koa-static');
const path = require('path');
const {IMAGE_BASE_PATH} = require('./config/config').image;
const chat = require('./chat')
const InitManager = require('./core/init');

const app = new Koa();


app.use(catchError);
app.use(parser());
// console.log(str);
app.use(server(path.join(__dirname,IMAGE_BASE_PATH)));
InitManager.initCore(app);

app.listen(9988,()=>{
    console.log('server run on 9988')
})