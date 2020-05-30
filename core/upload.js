const multer = require('koa-multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/upload/',
    filename(ctx, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
});

const upload = multer({
    storage
});

module.exports = upload;