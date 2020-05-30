const Router = require('koa-router');
const router = new Router({
    prefix:'/activity'
});
const {Activity} = require('../modules/activity');

const upload = require('../../core/upload');

const {isImage,removeImgByName} = require('../../core/util');


const {
    failed
} = require('../lib/helper')


router.post('/create',upload.single('preImage'), async(ctx)=>{
    const {filename} = ctx.req.file;
    const check = isImage(filename);
    const {title,introduction,html,raw,time} = ctx.req.body;
    if(check && title && introduction && html && raw && time){
        const tempData = {title,introduction,html,raw,time,filename};
        
        const result = Activity.addActivity(tempData);

        if(result){
            ctx.body = {
                code:0,
                data:'创建成功'
            }
        }
        else{
            failed('活动创建异常')
        }
    }
})

router.get('/backGetAll',async(ctx)=>{

})

router.get('/fontGetAll',async(ctx)=>{

})

module.exports = router;