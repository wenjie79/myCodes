const card = require('../models/card');
const user = require('../models/seller')
exports.createMessages = async function(ctx) {
  new card(ctx.request.body).save();
  ctx.body = ctx.request.body;
};
exports.findAll = async function(ctx) {
  const start = parseInt(ctx.params.start, 10);
  const limit = parseInt(ctx.params.limit, 10);
  const result= await card.find().sort({ create_date: -1 }).limit(limit).skip(start);
  ctx.body = {
    result:result,
    total: await card.count()
  }
};
exports.getDetail = async function (ctx) {
  const id = ctx.params.id;
  const result = await card.findOne({
    _id: id
  });
  ctx.body = result;
};
exports.addDebate = async function (ctx) {
  const auth = await user.findOne({
    _id: ctx.params.auth_id
  }).user_name;
  card.update({_id: ctx.params.card_id},
    {'$push':{debate: ctx.request.body}});
  // const addDebates = new card({
  //   auth: auth
  // });
  // await addDebates.save({_id: ctx.params.auth_id});
  ctx.body = ctx.params.card_id;
}
// const title = ctx.params.title;
// const content = ctx.params.content;
