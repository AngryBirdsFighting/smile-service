const Koa = require('koa')
const App = new Koa()
const {connect , initSchema} = require('./database/init.js')
const mongoose =  require('mongoose')
const koaRouter = require('koa-router')
const userRouter = require('./appApi/user.js')
const bodyParser = require("koa-bodyparser") // 将post请求转换到 ctx.request.body里
const cors = require('koa2-cors') // 后台解决开发跨域

App.use(bodyParser()).use(cors())
let router = new koaRouter()
// 装载子路由
router.use('/user', userRouter.routes(), userRouter.allowedMethods())
//加载路由中间件
App.use(router.routes()).use(router.allowedMethods())

// 连接数据库 
;(async () => {
    await connect()
    initSchema()
})()
// 设置端口
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})