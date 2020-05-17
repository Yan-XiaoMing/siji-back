const {sequelize} = require('../../core/db');
const {Sequelize,Model} = require('sequelize')

class Activity extends Model{

}

Activity.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    activityTitle:{
        type:Sequelize.STRING(64),
        unique:true,
        allowNull:false
    },
    activityTime:{
        type:Sequelize.DATE,
        allowNull:false
    },
    activityIntroduction:{
        type:Sequelize.STRING(255)
    }
},{
    sequelize,
    tableName:'activity'
})

Activity.sync({force:false}).then(()=>{
    // console.log('Activity sync')
})

module.exports={Activity};