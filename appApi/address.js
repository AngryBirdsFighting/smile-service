const koaRouter = require('koa-router')
const mongoose = require('mongoose')
let router = new koaRouter()    

// 新增地址
router.post("/add", async(ctx) => {
    console.log(ctx.request.body)
    // 获取用户MODEL
    let Address = mongoose.model('Address')
    //把从前端接收的POST数据封装成一个新的user对象
    let newAddress = new Address(ctx.request.body)
    // 将newUser 存入数据库， 存入失败就返回错误
    await newAddress.save().then(() => {
        ctx.body = {
            success: 1,
            message: '保存成功'
        }
    }).catch(err => {
        ctx.body = {
            success: null,
            message: err
        }
    })
})

// 修改地址
router.post("/edit", async(ctx) => {
    console.log(ctx.request.body)
    let data = ctx.request.body
    // 获取用户MODEL
    let Address = mongoose.model('Address')
    //把从前端接收的POST数据封装成一个新的user对象
    let newAddress = new Address(ctx.request.body)
    // 将newUser 存入数据库， 存入失败就返回错误
    await newAddress.update({ID:data.ID}, data, {multi:false}).then(() => {
        ctx.body = {
            success: 1,
            message: '修改成功'
        }
    }).catch(err => {
        ctx.body = {
            success: null,
            message: err
        }
    })
})
// 删除地址
router.post('/remove', async(ctx) => {
    let data = ctx.request.body
    let id = data.id
    let Address = mongoose.model('Address')
    await  Address.remove({'userName': userName})
    .then(async res => {
        if(res){
            ctx.body={ success:1, message:"删除成功"} 
        }else{
            ctx.body = {
                success: null,
                message: '删除失败'
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