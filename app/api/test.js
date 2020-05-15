const Router = require('koa-router');
const router = new Router();

router.get('/test',(ctx)=>{
    ctx.body = {
        msg:"1"
    }
})

module.exports = router;