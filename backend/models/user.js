const mongoose = require('mongoose')
const Book = require('./book').schema
const Catergory = require('./catergory').schema
// const BookClub = require('./bookClub').schema
const Invite = require('./invite').schema


const mongooseHidden = require('mongoose-hidden')()
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
  invitesSent: [{ type: mongoose.Schema.ObjectId, ref: 'BookClub' }]
})


schema.plugin(require('mongoose-unique-validator'))
schema.plugin(mongooseHidden)

// Save passwordConfirmation from our request as a temporary field
// called _passwordConfirmation
schema.
  virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    // _ is a convention, it means a temporary field
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'should match') // Invalid!
    }
    next() // Tells mongoose we're done
  })

// Pre lets you tap into the schemas lifecycle
schema
  .pre('save', function hashPassword(next) {
    if (this.isModified('password')) { // If the password has been created or changed
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync()) // Encrypt the password
    }
    next() // Tells mongoose we're done
  })

// Method to check if the password user tries to login with is the same
// as the one we've encrypted
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', schema)
