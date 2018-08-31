const Koa = require('koa')
const App = new Koa()
const {connect , initSchema} = require('./database/init.js')
const mongoose =  require('mongoose')
const jwt = require('koa-jwt');
const tokenError = require('./util/token.js');
// 
const bodyParser = require("koa-bodyparser") // 将post请求转换到 ctx.request.body里
const cors = require('koa2-cors') // 后台解决开发跨域
const fs = require('fs');
const path = require('path');

// App.use(function(ctx, next){
//   return next().catch((err) => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = '请登录\n';
//     } else {
//       throw err;
//     }
//   });
// })
App.use(tokenError());// jwt 验证
App.use(bodyParser()).use(cors());

// App.use(router.routes()).use(router.allowedMethods())
App.use(jwt({
  secret: "1234565"
}).unless({
  path: [/^\/user\/login/]
}));
// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {

  if (~file.indexOf('.js')) {
    App.use(require(path.join(__dirname, 'routes', file)).routes());
  }
});
// 连接数据库 
;(async () => {
    await connect()
    initSchema()
})()
// 设置端口
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})