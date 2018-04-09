const mongoose = require('mongoose')

module.exports = mongoose.model('seller', {
  head_img: {type: String},
  user_name: { type: String},
  password: { type: String },
  email: { type: String},
  tel: { type: String},
  score: { type: Number}
})
