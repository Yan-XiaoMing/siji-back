const Router = require('koa-router');
const router = new Router({
    prefix:'/img'
});

const upload = require('../../core/upload');

const {isImage,removeImgByName} = require('../../core/util');

const {
    failed
} = require('../lib/helper')

router.post('/create',upload.single('image'), async (ctx) => {
    const {
        filename
    } = ctx.req.file;
    console.log(filename);
    const check = await isImage(filename);
   
    if (check) {
        ctx.body = {
            code:0,
            data:filename
        }
    } else {
        await removeImgByName(filename)
        failed('上传失败');
    }
})

router.get('/remove/:filename', async (ctx) => {
    const {
        filename
    } = ctx.params;
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
})

module.exports = router;