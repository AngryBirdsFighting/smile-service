const Koa = require('koa')
const App = new Koa()
const {connect , initSchema} = require('./database/init.js')
const mongoose =  require('mongoose')
const jwt = require('koa-jwt');
const tokenError = require('./util/token.js');
const koaRouter = require('koa-router')
const userRouter = require('./appApi/user.js')
const goodsRouter = require('./appApi/goods.js')
const addressRouter = require('./appApi/address.js')
const bodyParser = require("koa-bodyparser") // 将post请求转换到 ctx.request.body里
const cors = require('koa2-cors') // 后台解决开发跨域


let router = new koaRouter()
// 装载子路由
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/goods', goodsRouter.routes(), goodsRouter.allowedMethods())
router.use('/address', addressRouter.routes(), addressRouter.allowedMethods())

App.use(tokenError());
App.use(bodyParser()).use(cors())
//加载路由中间件
App.use(router.routes()).use(router.allowedMethods())
App.use(jwt({
  secret: "123456"
}).unless({
  path: [/^\/backapi\/admin\/login/, /^\/blogapi\//]
}));

router.get
// 连接数据库 
;(async () => {
    await connect()
    initSchema()
})()
// 设置端口
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})