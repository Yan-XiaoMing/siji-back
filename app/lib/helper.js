function success(msg,errorCode){
    throw new global.error.Success(msg,errorCode);
}

function failed(msg,errorCode) {
    throw new global.error.Failed(msg,errorCode);
}


module.exports={
    success,
    failed
}