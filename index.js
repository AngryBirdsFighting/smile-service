const Koa = require('koa')
const App = new Koa()
const {connect , initSchema} = require('./database/init.js')
const mongoose =  require('mongoose')
;(async () => {
    await connect()
    initSchema()
    const User = mongoose.model('User')
    // let oneUser = new User({
    //     userName:"wangcha2o",
    //     password:'123456'
    // })
    // // mongoose 插入数据
    // oneUser.save().then(() => {
    //     console.log("插入成功")
    // })
    // mongoose 查询数据
    let user = await User.findOne({})
    console.log("------------------------------------------------------------------------------")
    console.log(user)
})()
App.use( async (ctx) => {
    ctx.body = "<h1>Hello SMILE</h1>"
})
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})