const goods = require('../models/goods');
exports.addGoods = async function(ctx) {
	new goods(ctx.request.body).save();
	ctx.body = ctx.request.body;
};
exports.getGoods = async function(ctx) {
  const keyword = ctx.request.body.fliter;
  const reg = new RegExp(keyword, 'i')
	const start = parseInt(ctx.params.start,10);
	const limit = parseInt(ctx.params.limit,10);
	const result = await goods.find({
    $or : [ //多条件，数组
      {name: {$regex : reg}}
    ],
    status: 1
  }).skip(start).limit(limit);
	const total = await goods.find({
    $or : [ //多条件，数组
      {name: {$regex : reg}}
    ],
    status: 1
  }).count();
	ctx.body = {result, total, keyword};
};
exports.getRecommend = async function(ctx) {
  const newGoods = await goods.find().sort({create_date: -1}).limit(4);
  const popularities = await goods.find().sort({
    sell: -1,
    popularity: -1
  }).limit(4);
  ctx.body = {newGoods, popularities};
};
exports.getDetail = async function(ctx) {
	const fliter = {
		_id: ctx.params.id
	}
	const result = await goods.find(fliter);
	ctx.body = result;
};
exports.addDebate = async function(ctx) {
	const good_id = ctx.params.good_id;
	await goods.update({
		_id: good_id
	}, {
		$push: {
			debate: ctx.request.body
		}
	});
	ctx.body = good_id;
}
