const Router = require('koa-router');
const router = new Router({
    prefix:'/activity'
});
const {ActivityApply} = require('../modules/activityApply');


const {isImage,removeImgByName} = require('../../core/util');


const {
    failed
} = require('../lib/helper')

router.post('/apply',async(ctx)=>{
    const data = ctx.request.body;
    const result = await ActivityApply.addApply(data);
    if(result){
        ctx.body = {
            code:0,
            data:'报名成功'
        }
    }
    else{
        ctx.body = {
            code:777,
            errMsg:'该手机号码已被注册'
        }
    }
})

router.get('/getApplyList/:id',async(ctx)=>{
    const id = ctx.params.id;
    const result =await ActivityApply.getApplyByActivityId(id);
    console.log(result);
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        ctx.body = {
            code:510,
            errMsg:'数据列表异常'
        }
    }
});


module.exports = router;