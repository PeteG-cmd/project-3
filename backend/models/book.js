
const mongoose = require('mongoose')
const Comment = require('./comment').schema

const schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  webId: { type: String, required: true, unique: true },
  isbnNumber: { type: String },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true },
  pageCount: { type: Number, required: true },
  language: { type: String, required: true },
  categories: { type: String, required: true },
  // comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
  comments: [Comment]

}, {
  timestamps: true
})

module.exports = mongoose.model('Book', schema)
