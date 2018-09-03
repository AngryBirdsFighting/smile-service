
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const config = require("../config/config.js")

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    
    try {
      // 获取jwt
      const token = ctx.header.authorization; 
      if (token) {
        try {
          // 解密payload，获取用户名和ID
          let payload = await verify(token.split(' ')[1], config.tokenSecret);
          // let payload = await verify(token, "123456");
          ctx.user = {
            name: payload.name,
            password: payload.password
          };
        } catch (err) {
          console.log('token verify fail: ', err)
        }
      }
      await next();
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          success: 0,
          message: '请登录'
        };
      } else {
        err.status = 404;
        ctx.body = {
          success: 0,
          message: '404'
        };
      }
    }
  }
}