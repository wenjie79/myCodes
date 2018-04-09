const mongoose = require('mongoose')

module.exports = mongoose.model('Todo', {
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  create_date: { type: Number, default: Date.now }
})
