const {sequelize} = require('../../core/db');
const {Sequelize,Model} = require('sequelize')

class ActivityApply extends Model{
    
    static async addApply(data){
        const applyer =await ActivityApply.findOne({
            where:data.phone
        })
        if(applyer){
            return false;
        }
        const {phone,name,activityTitle}
        return await ActivityApply.create({
            activityTitle,name,phone
        })
    }

}

ActivityApply.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    activityTitle:{
        type:Sequelize.STRING(64),
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

ActivityApply.sync({force:ture}).then(()=>{
    console.log('ActivityApply sync')
})

module.exports={ActivityApply};