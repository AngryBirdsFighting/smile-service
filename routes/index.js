const router = require('koa-router')();
const userRouter = require('../appApi/user.js')
const goodsRouter = require('../appApi/goods.js')
const addressRouter = require('../appApi/address.js')

router.use('/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/goods', goodsRouter.routes(), goodsRouter.allowedMethods())
router.use('/address', addressRouter.routes(), addressRouter.allowedMethods())

module.exports = router;