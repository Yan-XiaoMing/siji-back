const jwt = require('jsonwebtoken');
const fs = require('fs');
const {IMAGE_BASE_PATH} = require('../config/config').image;
const path = require('path');

const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

const generateToken = function(id,username,phone){
    const secrertKey = global.config.security.secretKey
    const expiresIn = global.config.security.expiresIn
    const token  = jwt.sign({
        id,
        username,
        phone
    },secrertKey,{expiresIn})
    return token
}

// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}


function isImage(filename){
    let tempArr = filename.split(".");
    let suffix = tempArr[tempArr.length-1];
    if(suffix == 'jpg' || suffix == 'png' || suffix == 'jpeg' || suffix == 'svg' || suffix == 'webp' ){
        return true;
    }
    else{
        return false;
    }
}

async function removeImgByName(filename){
    if(Array.isArray(filename)){
        try {
         filename.map(async (item)=>{
            await fs.unlinkSync(path.dirname(require.main.filename)+IMAGE_BASE_PATH+item);
         })
         return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    else{
        await fs.unlinkSync(path.dirname(require.main.filename)+IMAGE_BASE_PATH+filename,function (error){
            if(error){
                console.log(error);
                return false;
            }
            else{
                return true;
            }
        })
    }
  
}


module.exports = {toLine,toHump,generateToken,findMembers,isImage,removeImgByName};