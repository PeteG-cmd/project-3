const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  comment: { type: String, required: true, minLength: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', schema)

