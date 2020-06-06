const {Sequelize,Model} = require('sequelize');
const {sequelize} = require('../../core/db');
const {Failed} = require('../../core/http-exception');

class Chat extends Model{
    static async addChat(data){
        const {userId,username,content} = data;
        const createTime = new Date();
        const result = await Question.create({
            userId,
            username,
            content,
            createTime
        })
        return result
    }

    static async  getChatList(){
        const sql = `select * from chat order by createTime DESC limit 100`
        const res = await sequelize.query(sql)
        res = res[0]
        return res;
    }

}

Chat.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    questionTitle:{
        type:Sequelize.STRING(64),
        allowNull:false
    },
    questionContent:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
},{
    sequelize,
    tableName:'chat'
})


Chat.sync({force:false}).then(()=>{
    // console.log('Chat sync')
})

module.exports={Chat};