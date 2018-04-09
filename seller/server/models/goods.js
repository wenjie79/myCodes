const mongoose = require('mongoose');

module.exports = mongoose.model('goods', {
  seller: {type: String, required: true},
  sort:[
    {type: String, required: true}
    ],
  key:[
    {type: String, required: true}
  ],
  name: {type: String, required: true},
  light: {type: String, required: true},
  thumb: {type: String, required: true},
  price: {type: Number, required: true},
  stock: {type: Number, required: true},
  describe: {type: String, required: true},
  setSpec: {type: String, required: true},
  imgs: [
    {type: String, required: true}
    ],
  specs: [{
      sortName: {type: String},
      types: [
        {type: String}
      ]
  }],
  returnGood: {type: String, required: true},
  guarantee: {type: String, required: true},
  guaranteeDate: {type: Number, default: 0},
  status: {type: Number, default: 1}, // 商品状态,1:正在销售,0:已下架
  popularity: {type: Number, default: 0},
  sell: {type: Number, default: 0},
  debate: [{
  	user_id: {type: String },
  	user_name: {type: String},
  	content: {type: String},
  	admire: {type: Number, default: 0},
  	debate_date: { type: Number}
  }],
  create_date: { type: Number, default: Date.now }
});
