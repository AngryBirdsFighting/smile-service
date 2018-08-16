const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
// 创建用户schema模型 
const userSchema = new Schema({
    ID:ObjectId,
    userId:{type: String},
    path: {type: String},
    areaCode:{type: String},
    province:{type: String},
    county:{type: String},
    city:{type: String},
    default:{type: Boolean},
    contacts:{type: String},
    tel:{type: String, maxlength:13},
},{
    collection:'address' // 指定collection 名字
})
 
// 发布模型 必须首字母大写
mongoose.model('Address', userSchema)