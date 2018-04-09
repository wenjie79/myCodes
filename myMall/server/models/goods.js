const mongoose = require('mongoose');

module.exports = mongoose.model('goods', {
  seller: {type: String, required: true},
  name: { type: String, required: true },
  describe: { type: String, required: true },
  price: {type: Number, required: true },
  type: {type: String, required: true },
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
