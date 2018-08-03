const koaRouter = require('koa-router')
const mongoose = require('mongoose')
let router = new koaRouter()    

router.get('/', async(ctx) => {
    ctx.body = "首页"
})
// 注册
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

// 验证用户唯一性
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
//login
router.post('/login', async(ctx) => {
    let data = ctx.request.body
    let userName = data.userName
    let password = data.password
    let User = mongoose.model('User')
    await  User.findOne({'userName': userName})
    .then(async res => {
        if(res){
            let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePassword(password, res.password)
            .then(isMatch => {
                //返回比对结果
                ctx.body={ success:1, message:"登录成功"} 
            })
            .catch(err => {
                console.log(err)
                ctx.body={ success:null, message:err} 
            })
        }else{
            ctx.body = {
                success: null,
                message: '用户不存在'
            }
        }
    })
    .catch(err => {
        ctx.body = {
            success: null,
            message: err
        }
    })
})

module.exports = router