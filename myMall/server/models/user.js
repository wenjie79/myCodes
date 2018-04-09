const mongoose = require('mongoose')

module.exports = mongoose.model('user', {
  user_name: { type: String},
  password: { type: String },
  email: { type: String},
  tel: { type: String},
  myFavorite: [{
  	good_id: { type: String},
  	good_name:  { type: String},
  	good_price:  { type: String}
  }],
  purchase: [{
  	good_id: { type: String},
  	good_name:  { type: String},
  	good_price:  { type: String},
    number: {type: Number, default: 1}
  }],
  address: [{
    provience: { type: String},
    city: {type: String},
    block: {type: String},
    detailAddress: {type: String},
    tel: { type: String},
    name: { type: String},
    email: { type: String}
  }]
})
