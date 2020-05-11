const Sequelize = require('sequelize');

const {dbName,port,user,host,password} = require('../config/config').database;

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:false,
    timezone:'+08:00',
    define:{
        timestamps:true,
        paranoid:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true
    }
});

sequelize.sync({
    force:false
})

module.exports = {
    sequelize
}