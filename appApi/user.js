const koaRouter = require('koa-router')
const mongoose = require('mongoose')
let router = new koaRouter()    

router.get('/', async(ctx) => {
    ctx.body = "首页"
})
router.post("/register", async(ctx) => {
    console.log(ctx.request.body)
    ctx.body= ctx.request.body
    // 获取用户MODEL
    let User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    // 将newUser 存入数据库， 存入失败就返回错误
    await newUser.save().then(() => {
        ctx.body = {
            success: 1,
            message: '注册成功'
        }
    }).catch(err => {
        ctx.body = {
            success: null,
            message: err
        }
    })
})

router.post('/validate', async(ctx) => {
    console.log(ctx.request.body)
    let User = mongoose.model('User')
    let user = await  User.findOne({'userName': ctx.request.body.userName})
    if(user){
        ctx.body = {
            success: null,
            message: "该用户已存在"
        }
    } else{
        ctx.body = {
            success: 1,
            message: "OK"
        }
    }

})

module.exports = router