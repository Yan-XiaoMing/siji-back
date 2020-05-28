const Router = require('koa-router');
const router = new Router({
    prefix: '/opinion'
})

const {
    Opinion
} = require('../modules/opinion')

const {
    success,
    failed
} = require('../lib/helper')

router.post('/submit', async (ctx) => {
    const data = ctx.request.body;

    const result = await Opinion.addOpinion(data);
    if (result) {
        ctx.body={
            code:'0',
            data:'提交成功'
        }
    } else {
        failed('服务器繁忙!')
    }
})

router.get('/remove/:id',async(ctx)=>{
    const {id} = ctx.params;
    const result = Opinion.removeOpinion(id);
    if(result){
        ctx.body = {
            code:0,
            data:"意见删除成功"
        }
    }
    else {
        failed('删除失败,服务器异常')
    }
})

router.get('/getAll',async(ctx)=>{
    const result = await Opinion.getOpinionList();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        failed('服务器繁忙!')
    }
})


module.exports = router;