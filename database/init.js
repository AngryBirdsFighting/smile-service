const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
const glob = require('glob') //通配符
const {resolve} = require('path') //路径



// 使用通配符 和 resolve 引入所有的SCHEMA
exports.initSchema = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
// 
exports.connect = () => {
    // 连接数据库
    mongoose.connect(db)
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        // 增加数据库连接监听
        mongoose.connection.on('disconnected', () => {
            if(maxConnectTimes <= 3){
                maxConnectTimes++ 
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请联系数据库管理员 ---------------------')
            }
           
        })
        // 数据库连接出错重连
        mongoose.connection.on('error', err => {
            if(maxConnectTimes <= 3){
                maxConnectTimes++ 
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定请联系数据库管理员 ---------------------')
            }
        })
        // 连接成功时
        mongoose.connection.once('open', () => {
            resolve()
            console.log('mongoose connected successfully to smile-db ......')
        })
    })
}