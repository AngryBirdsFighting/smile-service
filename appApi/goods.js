const mongoose = require("mongoose")
const fs = require('fs')
const Router = require('koa-router')
let router = new Router()

// 导入goods数据
router.get('/insertAllGoods', async (ctx) => {
    fs.readFile('./data_json/newgoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value, index) => {
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                 console.log('失败：'+error)
            })
        })
    })
    ctx.body="开始导入数据"
})
// 导入数据
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        }) 
    })
    ctx.body="开始导入数据"
})
 // 
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                 console.log('失败：'+error)
            })
        })
       
        
    })
    ctx.body="开始导入数据"
})
// 获取商品详细
router.post("/goodsInfo", async (ctx) => {
    try{
        let goodsId = ctx.request.body.goodsId
        let newGoods = mongoose.model('Goods')
        let res = await newGoods.findOne({'ID': goodsId})
        if(res){
            ctx.body = {
                success:1,
                data:res
            }
        }else{
            ctx.body = {
                success:null,
                message:"数据不存在"
            }
        }
    }catch(err){
        ctx.body = {
            success:null,
            message:err
        }
    } 
})
// 获取商品大类
router.post("/getCategoryList", async(ctx) => {
    try{
        let newCategory = mongoose.model("Category")
        let res = await newCategory.find()
        ctx.body = {
            success:1,
            data:res
        }
    }catch(err){
        ctx.body = {
            success:null,
            message:err
        }
    }  
})

// 获取商品小类
router.post("/getCategorySubList", async(ctx) =>{
    try {
        let categoryId = ctx.request.body.categoryId
        let newCategorySub = mongoose.model('CategorySub')
        let res = await newCategorySub.find({MALL_CATEGORY_ID:categoryId})
        ctx.body = {
            success:1,
            data:res
        }
    } catch (error) {
        ctx.body = {
            success:null,
            message:error
        }
    }
})

// 根据商品小类 获取商品列表
router.post("/getGoodsListByCategorySubId", async(ctx) =>{
    try {
        let categorySubId = ctx.request.body.categorySubId
        let page = ctx.request.body.page
        let num = 15 //每页显示数量
        let start = (page-1)*num
        let newGoods = mongoose.model('Goods')
        let res = await newGoods.find({SUB_ID:categorySubId}).skip(start).limit(num)
        ctx.body = {
            success:1,
            data:res
        }
    } catch (error) {
        ctx.body = {
            success:null,
            message:error
        }
    }
})
module.exports=router;
