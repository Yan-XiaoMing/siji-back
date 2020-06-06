const Router = require('koa-router');
const router = new Router({
    prefix: '/term'
})
const {
    Term
} = require('../modules/term')


const {
    isImage,
    removeImgByName
} = require('../../core/util');

const {
    failed
} = require('../lib/helper')


router.post('/create', async (ctx) => {
    const data = ctx.request.body;
    const {title,introduction,image} = data;
    const result = await Term.createTerm(title, introduction, image);
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

router.get('/getAll', async (ctx) => {

    const result = await Term.getTermList();
    if (!result) {
        failed('数据库异常');
    }
    ctx.body = {
        code: 0,
        data: result
    }
});

router.post('/modify', async (ctx) => {
    const data = ctx.request.body;
    console.log(data);
    const result = await Term.updateTerm(data);
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

router.get('/remove/:filename', async (ctx) => {
    const {
        filename
    } = ctx.params;
    const resultData = Term.removeTermByImgName(filename);
    if (resultData) {
        const resultFile = removeImgByName(filename);
        if (resultFile) {
            ctx.body = {
                code: 0,
                data: '删除成功'
            }
        } else {
            ctx.body = {
                code: 500,
                errMsg: 'I/O异常,删除失败'
            }
        }
    } else {
        ctx.body = {
            code: 500,
            errMsg: '数据服务异常'
        }
    }
})

module.exports = router;