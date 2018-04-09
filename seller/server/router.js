const Router = require('koa-router');
const seller = require('./controllers/seller');
const upload = require('./controllers/upload');
const goods = require('./controllers/goods')
const router = new Router();

router
  .get('/manage/:user_name/:password', seller.getUserInfo)
  .post('/manage/user', seller.addUser)
  .get('/manage/upload', upload.upload)
  .post('/manage/uploadGood', goods.addGoods)
  .post('/manage/getGoods/:seller_id/:status/:limit/:start', goods.getGoods)
  .put('/manage/updateGood/:good_id/:status', goods.updateStatus)
  .post('/manage/search/:key/:status', goods.findGoods)
  .post('/manage/getSearchName/:search/:seller', goods.findNames)
module.exports = router;
