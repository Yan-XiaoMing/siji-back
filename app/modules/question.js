const {Sequelize,Model} = require('sequelize');
const {sequelize} = require('../../core/db');
const {Failed} = require('../../core/http-exception');

class Question extends Model{
    static async addQuestion(data){
        const {questionTitle,questionContent} = data;
        const result = await Question.create({
            questionTitle,
            questionContent
        })
        return result
    }

    static async removeQuestion(id){
        const result = await Question.destroy({
            where:{
                id
            }
        })
        return result;
    }

    static async getQuestionList(){
        const result = await Question.findAll();
        return result;
    }

    static async updateQuestion(data){
        const {id,questionTitle,questionContent} = data;
        if(id==null||id==undefined){
            throw new Failed('id为空');
        }
        try{
            await Question.update({
                questionContent,
                questionTitle
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

Question.init({
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
    tableName:'question'
})


Question.sync({force:false}).then(()=>{
    // console.log('Question sync')
})

module.exports={Question};