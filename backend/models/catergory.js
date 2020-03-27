
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
  category: { type: String, required: true }

})

module.exports = mongoose.model('Category', schema)

