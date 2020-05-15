const Router = require('koa-router');
const router = new Router({
    prefix:'/user'
});

const {Auth} = require('../../middlewares/auth');

const {User} = require('../modules/user');

const {success} = require('../lib/helper');

const {RegisterValidator,LoginValidator} = require('../validators/validator');

const {generateToken} = require('../../core/util');

router.post('/test', async (ctx)=>{
    LOG.info("123");
    ctx.body = {
        msg:"收到"
    }
})

router.post('/register',async (ctx)=>{
    // console.log('post')
    const v = await new RegisterValidator().validate(ctx);
    const user = {
        username:v.get('body.username'),
        password:v.get('body.password'),
        phone:v.get('body.phone'),
        email:v.get('body.email'),
    }
    const r = await User.create(user);
    success();
})

router.post('/login',async (ctx)=>{
    const v = await new LoginValidator().validate(ctx);
    const data = {
        username:v.get('body.username'),
        password:v.get('body.password'),
    };
    const user = await User.verifyUserPassword(data.username,data.password);
    let token = generateToken(user.id,user.username,user.phone);
    const result = User.upadteToken(user,token);
    if(result){
        ctx.body={
            code:0,
            token
        }
    }else{
       throw new global.error.ServerException();
    }
})

module.exports = router;