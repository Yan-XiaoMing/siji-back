const bcrypt  =require('bcryptjs');
const {sequelize} = require('../../core/db');
const {Sequelize,Model} = require('sequelize')

class User extends Model{
    static async verifyUserPassword(username,plainPassword){
        const user = await User.findOne({
            where:{
                username
            }
        })
        if(!user){
            throw new global.Error.AuthFailed('账号不存在')
        }
        const correct = bcrypt.compareSync(plainPassword,user.password);
        if(!correct){
            throw new global.error.AuthFailed('密码不正确');;
        }
        return user;
    }

    static async getUserById(id){
        const user = await User.findOne({
            where:{
                id
            }
        })
        return user
    }

    static async upadteToken(user,token){
        try{
            await User.update({
                token:token,
            },{
                where:{
                   'id':user.id 
                }
            })
        }catch(error){
            console.log(error);
            return false;
        }
        return true;
    }

    static async getAllUser(){
        try {
            const result = await User.findAll();
            return result;
        } catch (error) {
            return false;
            console.log(error);
        }
    }
}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING(64),
        unique:true,
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING(30),
        unique:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(30),
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        set(val){
            const salt = bcrypt.genSaltSync(10);
            //10为生成盐值的成本
            const psw = bcrypt.hashSync(val,salt);
            this.setDataValue('password',psw);
        }
    },   
    token:{
        type:Sequelize.STRING(255),
    }
},{
    sequelize,
    tableName:'user'
})

module.exports={User};