const router = require('koa-router')();
const userRouter = require('../appApi/user.js')
const goodsRouter = require('../appApi/goods.js')
const addressRouter = require('../appApi/address.js')

router.use('/backapi/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/backapi/goods', goodsRouter.routes(), goodsRouter.allowedMethods())
router.use('/backapi/address', addressRouter.routes(), addressRouter.allowedMethods())

module.exports = router;