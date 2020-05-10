const mongoose = require('mongoose')
const Book = require('./book').schema
const Catergory = require('./catergory').schema
// const BookClub = require('./bookClub').schema
const Invite = require('./invite').schema


const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true } })

const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, minLength: 8, unique: true },
  password: { type: String, required: true, hide: true },
  userBio: { type: String },
  books: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  booksRead: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  booksWishList: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  myLibraryLikedCategories: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  booksRated: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  categories: [Catergory],
  bookClubs: [{ type: mongoose.Schema.ObjectId, ref: 'BookClub' }],
  // invites: [{ type: mongoose.Schema.ObjectId, ref: 'Invite' }]
  invitesSent: [{ type: mongoose.Schema.ObjectId, ref: 'BookClub' }],
  image: [{ type: mongoose.Schema.ObjectId, ref: 'Image' }]
})


schema.plugin(require('mongoose-unique-validator'))
schema.plugin(mongooseHidden)

schema.
  virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match')
    }
    next() 
  })


schema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) { 
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) 
    }
    next() 
  })

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', schema)
