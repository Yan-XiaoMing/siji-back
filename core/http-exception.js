class HttpException extends Error {
    constructor(msg = '服务器异常', status = 400, errorCode = 10000) {
        super();
        this.errorCode = errorCode;
        this.status = status;
        this.message = msg;
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.status = 400;
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 0;
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0;
    }
}

class Failed extends HttpException{
    constructor(msg, errorCode) {
        super();
        this.code = 500;
        this.msg = msg || 'error'
        this.errorCode = errorCode || 10001;
    }
}

class ServerException extends HttpException{
    constructor(msg,errorCode){
        super();
        this.code = 500;
        this.msg = msg || '服务器异常'
        this.errorCode =  errorCode || 15000;
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.msg = msg || '资源未找到';
        this.errorCode = errorCode || 10000;
        this.code = 404
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.msg = msg || '授权失败';
        this.errorCode = errorCode || 10004;
        this.code = 401
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    Failed,
    NotFound,
    AuthFailed,
    Forbbiden,
    ServerException
};