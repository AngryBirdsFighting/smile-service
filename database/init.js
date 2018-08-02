const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'

// mongoose.Promise = global.Promise
console.log(1)
exports.connect = () => {
    // 连接数据库
    console.log(2)
    mongoose.connect(db)

    // 增加数据库连接监听
    mongoose.connection.on('disconnected', () =>{
        mongoose.connect(db)
        console.log(3)
    })
    // 数据库连接出错重连
    mongoose.connection.on('error', err => {
       
        console.log("数据库连接失败：原因-----" + err)
        mongoose.connect(db)
    })

    // 连接成功时
    mongoose.connection.once('open', () => {
        console.log('mongoose connected successfully to smile-db ......')
    })
}