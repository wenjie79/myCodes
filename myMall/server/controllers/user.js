const user = require('../models/user');
const goods = require('../models/goods');

exports.addUser = async function(ctx) {
  await new user(ctx.request.body).save();
  ctx.body = ctx.request.body;
};
exports.getUserInfo = async function(ctx) {
  const params = {
    user_name: ctx.params.user_name,
    password: ctx.params.password,
  };
  const result = await user.findOne(params);
  ctx.body = result;
};
exports.getMaster = async function(ctx) {
  const params = {
    _id: ctx.params.id
  };
  const result = await user.findOne(params);
  ctx.body = result;
};
exports.addCollect = async function(ctx) {
  const result = await goods.findById(ctx.params.id);
  const User = await user.findById(ctx.params.user);
  const info = {
    good_id: result._id,
    good_name: result.name,
    good_price: result.price
  }
  await user.update({
    _id: User._id
  }, {
    $push: {
      myFavorite: info
    }
  });
  ctx.body = User;
}
exports.getCollect = async function(ctx) {
  const result = await user.findById(ctx.params.id, {myFavorite: 1, _id: 0});
  ctx.body = result;
}
exports.deleteCollect = async function(ctx) {
  const good_id = ctx.params.good_id;
  const user_id = ctx.params.user_id;
  await user.update({
    _id: user_id
  }, {
    $pull: {
      myFavorite: {
        good_id: good_id
      }
    }
  });
  ctx.body = '';
}
exports.addCarts = async function(ctx) {
  const result = await goods.findById(ctx.params.id);
  const User = await user.find({
      _id: ctx.params.user,
      'purchase.good_id': ctx.params.id
  }, {purchase: 1 ,_id: 0});
  const info = {
    good_id: result._id,
    good_name: result.name,
    good_price: result.price
  };
  if (User !='') {
    await user.update({
      _id: ctx.params.user,
      'purchase.good_id': ctx.params.id
    }, {
      $inc: {
        'purchase.$.number': 1
      }
    });
  } else {
    await user.update({
      _id: ctx.params.user
    }, {
      $push: {
        purchase: info
      }
    });
  }
  ctx.body = User[0];
}
exports.getCarts = async function(ctx) {
  const result = await user.findById(ctx.params.id, {purchase:1 , _id: 0});
  ctx.body = result;
}
exports.deleteCart = async function(ctx) {
  const good_id = ctx.params.good_id;
  const user_id = ctx.params.user_id;
  await user.update({
    _id: user_id
  }, {
    $pull: {
      purchase: {
        good_id: good_id
      }
    }
  });
  ctx.body = '';
}
