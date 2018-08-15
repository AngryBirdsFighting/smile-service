const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') //密码 加盐加密
let ObjectId = Schema.Types.ObjectId
let SALT_WORK_FACTOR = 10
// 创建用户schema模型 
const userSchema = new Schema({
    userId:ObjectId,
    userName: {unique:true, type: String},
    password:{type: String},
    phone:{type:String, maxlength:13},    
    nickname:{type:String, unique: true},
    createAt:{type:Date, default: new Date()},
    lastLoginAt:{type:Date, default: new Date()}
},{
    collection:'user' // 指定collection 名字
})

 //每次存储数据时都要执行
userSchema.pre("save",function (next){ // 注意 不能使用箭头函数 ， 会改变this 指向
    console.log(this)
    bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) =>{ // salt :提供生成的盐的回调的第二个参数。
        if(err){
            return next(err)
        }
        bcrypt.hash(this.password, salt , (err, hash) => { // 加密 并且 与 salt 拼接
            if(err){
                return next(err)
            }else{
                this.password = hash
                next()
            }
        })
    })
})

//密码验证
userSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
 
// 发布模型 必须首字母大写
mongoose.model('User', userSchema)