const User = require('../models/user')
const Book = require('../models/book')


function addBook(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)
  Book.findOne({ googleId: req.body.googleId })
    .then(book => {
      if (!book) {
        Book
          .create(req.body)
          .then(book => {
            User.findById(req.body.user._id)
              .then(user => {
                user.books.push(book)
                return user.save()
              })
              .then(user => res.status(201).send({ user, message: 'Book Created and added to User' }))
              .catch(err => res.status(401).send(err))
          })
      } else {
        Book.findOne({ googleId: req.body.googleId })
          .then(book => {
            User.findById(req.body.user._id)
              .then(user => {
                user.books.push(book)
                return user.save()
              })
              .then(user => res.status(201).send({ user, message: 'Library already contains this book, however the book has now been added to User' }))
              .catch(err => res.status(401).send(err))
          })
          .catch(err => res.status(401).send(err))
      }
    })
}


function indexBooks(req, res) {
  Book
    .find()
    .then(books => {
      res.send(books)
    })
}

module.exports = {
  addBook,
  indexBooks
}