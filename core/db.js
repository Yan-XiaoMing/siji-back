const Sequelize = require('sequelize');

const {dbName,port,user,host,password} = require('../config/config').database;

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:false,
    timezone:'+08:00',
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    define:{
        timestamps:false,
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true
    }
});



module.exports = {
    sequelize
}