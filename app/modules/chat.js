const {
    Sequelize,
    Model
} = require('sequelize');
const {
    sequelize
} = require('../../core/db');
const {
    Failed
} = require('../../core/http-exception');
const {toHump} = require('../../core/util')

class Chat extends Model {
    static async addChat(data) {
        const {
            userId,
            username,
            content
        } = data;
        const createTime = new Date();
        const result = await Chat.create({
            userId,
            username,
            content,
            createTime
        })
        return result
    }

    static async getChatList() {
        const sql = `select * from chat order by create_time limit 100`
        try {
            let res = await sequelize.query(sql)
            res = res[0];
            let newRes = [];
            for(let item of res){
                var newObj = {};
                for(let i in item){
                    let newName = toHump(i);
                    newObj[newName] = item[i];
                }
                newRes.push(newObj);
            }
          
            return newRes;
        } catch (error) {
            console.log(error);
           throw new Failed('数据异常')
        }

    }

}

Chat.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createTime: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'chat'
})


Chat.sync({
    force: false
}).then(() => {
    // console.log('Chat sync')
})

module.exports = {
    Chat
};