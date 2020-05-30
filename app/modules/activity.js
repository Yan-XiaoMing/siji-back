const {
    sequelize
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize')

class Activity extends Model {

    static async addActivity(data) {
        const {
            filename,
            title,
            introduction,
            html,
            raw,
            time
        } = data;
        try {
            const result = await Activity.create({
                preImage: filename,
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
}

Activity.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    preImage: {
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