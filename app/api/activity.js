const Router = require('koa-router');
const router = new Router({
    prefix:'/activity'
});
const {Activity} = require('../modules/activity');

module.exports = router;