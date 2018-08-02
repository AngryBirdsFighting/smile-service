const Koa = require('koa')
const App = new Koa()
const {connect} = require('./database/init.js')

;(async () => {
    await connect()
})()
App.use( async (ctx) => {
    ctx.body = "<h1>Hello SMILE</h1>"
})
App.listen('3000',() => {
    console.log('service starting at http://127.0.0.1:3000')
})