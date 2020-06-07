const Router = require('koa-router');
const router = new Router({
    prefix:'/chat'
});
const {Chat} = require('../modules/chat');

const {
    failed
} = require('../lib/helper')

router.get('/list',async(ctx)=>{
    const result =await Chat.getChatList();
    if(result){
        ctx.body = {
            code:0,
            data:result
        }
    }
    else{
        ctx.body = {
            code:566,
            errMsg:'获取聊天列表失败'
        }
    }
})

module.exports = router;