const goods = require('../models/goods');
const mongoose = require('mongoose');
exports.addGoods = async function(ctx) {
	new goods(ctx.request.body).save();
	ctx.body = ctx.request.body;
};
exports.getGoods = async function(ctx) {
	const seller= ctx.params.seller_id;
	const status = ctx.params.status;
	const start = parseInt(ctx.params.start,10);
	const limit = parseInt(ctx.params.limit,10);
	const result = await goods.find({
    seller: seller,
    status: status
  }).limit(limit).skip(start);
	const total = await goods.find({
    seller: seller,
    status: status
    }).count();
	ctx.body = {result, total};
};
exports.updateStatus = async function (ctx) {
  await goods.update({
      _id: mongoose.Types.ObjectId(ctx.params.good_id),
    }, {
      status: ctx.params.status
    });
  ctx.body = ctx.params.good_id;
};
exports.findGoods = async function (ctx) {
  const keyword = ctx.params.key;
  const reg = new RegExp(keyword, 'i')
  let result = await goods.find({
    $or : [ //多条件，数组
      {name: {$regex : reg}},
      {key: {$regex : reg}},
      {sort: {$regex : reg}},
    ],
    status: ctx.params.status
  });
  let total= result.length;
  ctx.body = {result, total};
};
exports.findNames = async function (ctx) {
  let name = [];
  const keyword = ctx.params.search;
  const reg = new RegExp(keyword, 'i')
  let result = await goods.find({
    $or : [ //多条件，数组
      {name: {$regex : reg}}
    ],
    seller: ctx.params.seller
  },{
    name: 1
  }).limit(4);
  for (var i in result) {
    name.push(result[i].name);
  }
  ctx.body = name;
}
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
