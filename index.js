const Koa = require('koa')
const App = new Koa()
const {connect , initSchema} = require('./database/init.js')
const jwt = require('koa-jwt')
const tokenError = require('./util/token.js');
const config = require("./config/config.js")
const router = require("./routes/index.js")
const bodyParser = require("koa-bodyparser") // 将post请求转换到 ctx.request.body里
//const cors = require('koa2-cors') // 后台解决开发跨域
// const fs = require('fs');
// const path = require('path');

App.use(tokenError());// jwt 验证
App.use(bodyParser())//.use(cors());
App.use(jwt({
  secret: config.tokenSecret
}).unless({
  // path: [/^\/user\/login/] // cors路由过滤
  path: [/^\/backapi\/user\/login/] // 代理路由过滤
}));

// 使用jwt 验证，加载路由必须放到jwt后面
App.use(router.routes()).use(router.allowedMethods())
// // routes
// fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
//   if (~file.indexOf('.js')) {
//     App.use(require(path.join(__dirname, 'routes', file)).routes());
//   }
// });
// 连接数据库 
;(async () => {
    await connect()
    initSchema()
})()
// 设置端口
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})