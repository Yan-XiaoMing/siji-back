const {
    Sequelize,
    Model
} = require('sequelize');
const {
    sequelize
} = require('../../core/db');

class Term extends Model {

    static async createTerm(title, introduction, filename) {
        try {
            const result = await Term.create({
                title,
                introduction,
                image: filename
            })
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getTermList() {
        try {
            const result = await Term.findAll();
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async removeTermByImgName(filename) {
        try {
            const result = await Term.destroy({
                where: {
                    image: filename
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async updateTerm(data){
        const {id,title,introduction,image} = data;
        if(id==null||id==undefined){
            throw new Failed('id为空');
        }
        if(title==null||title==undefined){
            throw new Failed('title为空');
        }
        if(introduction==null||introduction==undefined){
            throw new Failed('introduction为空');
        }
        if(image==null||image==undefined){
            throw new Failed('image为空');
        }
        try{
            await Term.update({
                title,
                introduction,
                image
            },{
                where:{
                   id 
                }
            })
        }catch(error){ 
            console.log(error);
            return false;
        }
        return true;
    }
}

Term.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
    },
    introduction: {
        type: Sequelize.STRING(255)
    },
    image: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'term',
    sequelize
})

Term.sync({
    force: false
}).then(() => {
    // console.log('Term sync')
})

module.exports = {
    Term
};