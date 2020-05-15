const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {

    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);

            if (!userToken || !userToken.name) {
                throw new global.error.Forbbiden()
            }
            try {
                //name是通过basicAuth传来的token
                var decode = jwt.verify(userToken.name, global.config.security.secretKey);
                console.log(decode);
            } catch (error) {
                let errMsg;
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                } else {
                    errMsg = 'token非法'
                }
                throw new global.error.Forbbiden(errMsg);
            }

            //token检测
            //token 开发者传递令牌

            //http规定身份验证机制 HttpBasicAuth

            ctx.auth = {
                id:decode.id,
                name:decode.name
            }
            await next();
        }
    }
}

module.exports = {
    Auth
}