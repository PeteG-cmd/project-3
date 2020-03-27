
const mongoose = require('mongoose')
const Comment = require('./comment').schema

const schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  ISBNNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true, unique: true },
  publishedDate: { type: String, required: true },
  publisher: { type: String, required: true },
  pageCount: { type: String, required: true },
  averageRating: { type: String, required: true },
  genre: { type: String, required: true },
  // comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
  comments: [Comment]

}, {
  timestamps: true
})

module.exports = mongoose.model('Book', schema)
