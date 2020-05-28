const {Sequelize,Model} = require('sequelize');
const {sequelize} = require('../../core/db');

class Term extends Model{

}

Term.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    termTitle:{
        type:Sequelize.STRING(64),
        unique:true,
        allowNull:false
    },
    activityTime:{
        type:Sequelize.DATE,
        allowNull:false
    },
    termIntroduction:{
        type:Sequelize.STRING(255)
    }
},{
    tableName:'term',
    sequelize
})

Term.sync({force:true}).then(()=>{
    // console.log('Opinion sync')
})