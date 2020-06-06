const {sequelize} = require('../../core/db');
const {Sequelize,Model} = require('sequelize')
const {ParameterException,DataException} = require('../../core/http-exception')

class ActivityApply extends Model{
    
    static async addApply(data){

        const {activityId,phone,name} = data;

        const applyer =await ActivityApply.findOne({
            where:{
                phone
            }
        })
        if(applyer){
            return false;
        }
        return await ActivityApply.create({
            activityId,name,phone
        })
    }

    static async getApplyByActivityId(id){
        console.log(id);
        if(id!==null&&id!==undefined){
            try {
                const result = await ActivityApply.findAll({
                    where:{
                        activityId:id
                    }
                })
                return result;              
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        else{
            throw new ParameterException()
        }
    }

    static async removeAllByActivityId(activityId){
        try {
            return await ActivityApply.destroy({
                where:{
                    activityId
                }
            })
        } catch (error) {
            console.log(error);
            throw new DataException('活动报名信息删除失败');
        }
    }

    static async removeOneById(id){
        try {
            return await ActivityApply.destroy({
                where:{
                    id
                }
            })
        } catch (error) {
            console.log(error);
            throw new DataException('活动报名信息删除失败');
        }
    }

}

ActivityApply.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    activityId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING(30),
        unique:true,
        allowNull:false
    }
},{
    sequelize,
    tableName:'activity_apply'
})

ActivityApply.sync({force:false}).then(()=>{
    // console.log('ActivityApply sync')
})

module.exports={ActivityApply};