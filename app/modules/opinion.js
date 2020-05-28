const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {toHump} = require('../../core/util');

class Opinion extends Model{
    static async addOpinion(data){
        const date = new Date();
        const {score,comment} = data;
        const result = await Opinion.create({
            commentTime:date,
            score,
            comment
        })
        return result
    }

    static async removeOpinion(id){
        if(id==null||id==undefined){
            throw new Failed('id为空');
        }
        try {
            const result = await Opinion.destroy({
                where:{
                    id
                }
            })
            return result;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    static async getOpinionList(){
        const sql = "SELECT * FROM opinion Order By comment_time DESC";
        const result = await sequelize.query(sql);
        // console.log(result);
        const newResult = [];
        for(let item of result[0]){
            let obj = {};
            for(let i in item){
                let newName = toHump(i);
                obj[newName] = item[i];
            }
            newResult.push(obj);
            // console.log(newResult);
        }
        return newResult;
    }
}

Opinion.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    score:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    comment:{
        type:Sequelize.STRING(1234),
        allowNull:false
    },
    commentTime:{
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    sequelize,
    tableName:'opinion'
})

Opinion.sync({force:false}).then(()=>{
    // console.log('Opinion sync')
})

module.exports={Opinion};