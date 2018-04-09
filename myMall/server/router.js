const Router = require('koa-router');
const user = require('./controllers/user');
const goods = require('./controllers/goods');
const upload = require('./controllers/upload');
const router = new Router();

router
  .post('/api/v1/user', user.addUser)
  .get('/api/v1/:user_name/:password', user.getUserInfo)
  .post('/api/v1/collect/:user/:id', user.addCollect)
  .post('/api/v1/getCollect/:id', user.getCollect)
  .delete('/api/v1/deleteCollect/:user_id/:good_id', user.deleteCollect)
  .post('/api/v1/carts/:user/:id', user.addCarts)
  .post('/api/v1/getCarts/:id', user.getCarts)
  .delete('/api/v1/deleteCart/:user_id/:good_id', user.deleteCart)
  .post('/api/v1/addGoods', goods.addGoods)
  .post('/api/v1/goods/:start/:limit', goods.getGoods)
  .get('/api/v1/getRecommend', goods.getRecommend)
  .get('/api/v2/:id', goods.getDetail)
  .post('/api/v2/debate/:good_id', goods.addDebate)
  .get('/api/upload', upload.upload)
module.exports = router;
