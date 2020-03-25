const mongoose = require('mongoose')
// const BookClub = require('./bookClub').schema


const schema = new mongoose.Schema({
  text: { type: String, required: true },
  // user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  bookClub: { type: mongoose.Schema.ObjectId, ref: 'BookClub' }
}, {
  timestamps: true
})

module.exports = mongoose.model('Invite', schema)

// WE NEED TO CONSDER THIS... HOW WILL THIS WORK AND WHERE SHOULD THE DATA SIT... CAN IT BELONG TO BOTH THE BOOK CLUB AND THE USER?