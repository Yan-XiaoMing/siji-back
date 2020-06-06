const Router = require('koa-router');
const router = new Router({
    prefix:'/activity'
});
const {Activity} = require('../modules/activity');
const {ActivityApply} = require('../modules/activityApply');


const {removeImgByName} = require('../../core/util');


const {
    failed
} = require('../lib/helper')


router.post('/create', async(ctx)=>{
    const data = ctx.request.body;
    const result = await Activity.addActivity(data);
    if (result) {
        ctx.body = {
            code: 0,
            data: result
        }
    } else {
        removeImgByName(filename)
        ctx.body = {
            code: 500,
            errMsg: '数据操作异常'
        }
    }
})

router.get('/backGetAll',async(ctx)=>{
    const result = await Activity.backGetActivity();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        failed('数据查询异常');
    }
})

router.get('/fontGetAll',async(ctx)=>{
    const result = await Activity.fontGetActivity();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        failed('数据查询异常');
    }
})

router.post('/modify', async (ctx) => {
    const data = ctx.request.body;
    const result = await Activity.updateActivity(data);
    if(result){
        ctx.body = {
            code:0,
            data:'修改成功'
        }
    }
    else{
        ctx.body = {
            coed:500,
            errMsg:'数据更新异常'
        }
    }
})

router.get('/getOldActivity',async(ctx)=>{
    const result = await Activity.getOldActivityList();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        ctx.body = {
            coed:511,
            errMsg:'数据查询异常'
        }
    }
})

router.get('/getNewActivity',async(ctx)=>{
    const result = await Activity.getNewActivityList();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        ctx.body = {
            coed:511,
            errMsg:'数据查询异常'
        }
    }
})


router.post('/remove',async(ctx)=>{
    const data = ctx.request.body;
    const {id,image} = data;
    const resultFile =await removeImgByName(image);
    const resultMember = await ActivityApply.removeAllByActivityId(id);
    const result = await Activity.removeById(id);
    ctx.body = {
        code:'0',
        msg:'删除成功',
        data:[resultFile,resultMember,result]
    }
})
module.exports = router;