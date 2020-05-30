const Router = require('koa-router');
const router = new Router({
    prefix: '/term'
})
const {
    Term
} = require('../modules/term')

const upload = require('../../core/upload');

const {
    isImage,
    removeImgByName
} = require('../../core/util');

const {
    failed
} = require('../lib/helper')


router.post('/create', upload.single('image'), async (ctx) => {
    const {
        filename
    } = ctx.req.file;
    const check = isImage(filename);
    const {
        title,
        introduction
    } = ctx.req.body;
    if (check && title && introduction) {
        const result = await Term.createTerm(title, introduction, filename);
        if(result){
            ctx.body = {
                code: 0,
                data: result
            }
        }
        else{
            removeImgByName(filename)
            ctx.body ={
                code: 500,
                errMsg: '数据操作异常'
            }
        }
      
    } else {
        removeImgByName(filename)
        failed('参数异常');
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
    }else{
        ctx.body = {
            code: 500,
            errMsg: '数据服务异常'
        }
    }
})

module.exports = router;