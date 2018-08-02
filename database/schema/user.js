const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

// 创建用户schema模型 
const userSchema = new Schema({
    userId:ObjectId,
    userName: {unique:true, type: String},
    password:{type: String},
    createAt:{type:Date, default: new Date()},
    lastLoginAt:{type:Date, default: new Date()}
})
// 发布模型 必须首字母大写
mongoose.model('User', userSchema)