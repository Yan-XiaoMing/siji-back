const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize')
const {DataException} = require('../../core/http-exception')

const Op = Sequelize.Op

class Activity extends Model {

    static async addActivity(data) {
        const {
            image,
            title,
            introduction,
            html,
            raw,
            time
        } = data;
        try {
            const result = await Activity.create({
                image,
                title,
                introduction,
                html,
                raw,
                time
            })
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    static async backGetActivity() {
        try {
            const result = await Activity.findAll({
                attributes: {
                    exclude: ['html']
                }
            })
            return result
        } catch (error) {
            console.log(error)
            return false;
        }
    };


    static async fontGetActivity() {
        try {
            const result = await Activity.findAll({
                attributes: {
                    exclude: ['raw']
                }
            })
            return result
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    static async updateActivity(data) {
        const {
            id,
            image,
            title,
            introduction,
            html,
            raw,
            time
        } = data;

        try {
            const result = await Activity.update({
                image,
                title,
                introduction,
                html,
                raw,
                time
            }, {
                where: {
                    id
                }
            })
            return result
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getOldActivityList() {
        let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        let sql = `SELECT id,image,title,time,introduction,html FROM activity WHERE time<'${time}'`;
        try {
            let result =await sequelize.query(sql,{raw:true})
            result = result[0];
            return result;
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async getNewActivityList() {
        let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        let sql = `SELECT id,image,title,time,introduction,html FROM activity WHERE time>'${time}'`;
        try {
            let result =await sequelize.query(sql,{raw:true})
            result = result[0]
            return result;
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async removeById(id){
        try {
            const result = await Activity.destroy({
                where:{
                    id
                }
            })
            return result;
        } catch (error) {
            console.log(error);
            throw new DataException('活动删除异常')
        }
    }
}

Activity.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    introduction: {
        type: Sequelize.STRING(255)
    },
    html: {
        type: Sequelize.TEXT
    },
    raw: {
        type: Sequelize.TEXT
    }
}, {
    sequelize,
    tableName: 'activity'
})


Activity.sync({
    force: false
}).then(() => {
    // console.log('Activity sync')
})

module.exports = {
    Activity
};