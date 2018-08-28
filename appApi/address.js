const koaRouter = require('koa-router')
const mongoose = require('mongoose')
let router = new koaRouter()    

// 新增地址
router.post("/add", async(ctx) => {
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
    let data = ctx.request.body
    // 获取用户MODEL
    let Address = mongoose.model('Address')
    // 将newUser 存入数据库， 存入失败就返回错误
    await Address.findByIdAndUpdate({_id:data._id}, data, {multi:false}, function(err,row){
        if(err){
            ctx.body = {
                success: null,
                message: err
            }
        }else{
            ctx.body = {
                success: 1,
                message: '修改成功'
            }
        }
    })
})
// 获取地址
router.post("/getList", async(ctx) => {
    if(ctx.user){
        let data = ctx.request.body
        // 获取用户MODEL
        let Address = mongoose.model('Address')
        //把从前端接收的POST数据封装成一个新的user对象
        // 将newUser 存入数据库， 存入失败就返回错误
        await Address.find({userId:data.ID}).then((res) => {
            ctx.body = {
                success: 1,
                data: res
            }
        }).catch(err => {
            ctx.body = {
                success: null,
                message: err
            }
        })
    }else{
        ctx.body = {
            success: null,
            message: "请登录"
        }
    }
    
})
// 删除地址
router.post('/remove', async(ctx) => {
    let data = ctx.request.body
    let Address = mongoose.model('Address')
    await  Address.remove({'_id': data._id})
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