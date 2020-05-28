const Router = require('koa-router');
const router = new Router({
    prefix: '/question'
})
const {
    Question
} = require('../modules/question')


const {
    failed
} = require('../lib/helper')

router.post('/add',async(ctx)=>{
    const data = ctx.request.body;
    const result = await Question.addQuestion(data);
    if (result) {
        ctx.body={
            code:'0',
            data:'问题增加成功'
        }
    } else {
        failed('增加失败,服务器异常')
    }
})

router.get('/remove/:id',async(ctx)=>{
    const {id} = ctx.params;
    const result = await Question.removeQuestion(id);
    if(result){
        ctx.body = {
            code:0,
            data:"问题删除成功"
        }
    }
    else {
        failed('删除失败,服务器异常')
    }
})

router.post('/modify',async(ctx)=>{
    const data = ctx.request.body;
    const result = Question.updateQuestion(data);
    if(result){
        ctx.body = {
            code:0,
            data:"修改成功",
            result
        }
    }
    else{
        failed('修改失败,服务器繁忙!')
    }
})

router.get('/getAll',async(ctx)=>{
    const result = await Question.getQuestionList();

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