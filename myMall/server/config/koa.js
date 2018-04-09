const Koa = require('koa');
// const qn = require('./qiniu')
const koa_bodyparser = require('koa-bodyparser');
// const Router = require('koa-router');
const app = new Koa();
// const routers = new Router();
const router = require('../router');

app.use(koa_bodyparser());
// app.use(qn);
app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.use(router.routes()); // 将路由规则挂载到Koa上。
app.use(router.allowedMethods());
app.listen(8000,() => {
  console.log('Koa is listening in 8000');
});

