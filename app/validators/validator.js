const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')

const {User} = require('../modules/user');

class PositiveIntergerValidator extends LinValidator{
    constructor(){
        super();
        this.id=[
            new Rule('idInt','需求是正整数',{
                min:1
            })
        ]
    }
}

class RegisterValidator extends LinValidator{
    constructor(){
        super();
        this.username = [
            new Rule('isLength','用户名至少4个字符,最多10个字符',{
                min:4,
                max:10
            })
        ]
        this.password = [
            new Rule('isLength','密码至少6个字符,最多16个字符',{
                min:6,
                max:16
            }),
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
    }
    async validateUsername(vals){
        const username = vals.body.username;
        const user = await User.findOne({
            where:{
                username
            }
        })
        if(user){
            throw new Error('用户已存在')
        }
    }
    async validatePhone(vals){
        const phone = vals.body.phone;
        const user = await User.findOne({
            where:{
                phone
            }
        })
        if(user){
            throw new Error('手机号已被注册')
        }
    }
    async validateEmail(vals){
        const email = vals.body.email;
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(user){
            throw new Error('邮箱已被注册')
        }
    }
}

class TokenValidator extends LinValidator{
    constructor (){
        super();
        this.account = [
            new Rule('isLength','不符合账号规则',{
                min:4,
                max:32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength','至少6个字符',{
                min:6,
                max:128
            })
        ]
    }
}

class LoginValidator extends LinValidator{
    constructor (){
        super();
        this.username = [
            new Rule('isLength','用户名为空',{min:1})
        ]
        this.password = [
            new Rule('isLength','密码为空',{min:1}),
        ]
    }
}

module.exports = {
    PositiveIntergerValidator,
    RegisterValidator,
    TokenValidator,
    LoginValidator
}