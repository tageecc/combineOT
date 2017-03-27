const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const statics = require('koa-static');
const hbs = require('koa-hbs');

const index = require('./routes');
const adminRequired = require('./middlewares/adminRequired');
const session = require('koa-session-minimal');


// 使用session中间件
app.use(session({
    key: 'SESSION_ID'
}));
onerror(app);
app.use(logger());
app.use(bodyParser());

// 渲染引擎
hbs.registerHelper('parseDate', (date) =>{
    console.log(date);
    return new Date(date).toLocaleString();
});
app.use(hbs.middleware({
    viewPath: __dirname + '/views',
    defaultLayout: 'layout',
    disableCache: true
}));

// 静态资源路径
app.use(statics(__dirname + '/public'));

// 路由配置
app.use(adminRequired);
app.use(index.routes());
app.use(index.allowedMethods());

module.exports = app;