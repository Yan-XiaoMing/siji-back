const Koa = require('koa')

const app = new Koa();

app.listen(9988,()=>{
    console.log('server run on 9988')
})