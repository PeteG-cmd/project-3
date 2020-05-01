const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  imageName: { type: String, required: true },
  imageData: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Image', schema)


