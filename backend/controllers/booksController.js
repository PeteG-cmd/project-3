const User = require('../models/user')
const Book = require('../models/book')


function addBook(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)
  Book.findOne({ googleId: req.body.googleId })
    .then(book => {
      if (book) {
        User.findById(req.body._id)
          .then(user => user.books.push(book.book_id))
          .then(res.status(201).send({ book, message: 'Book already in Library, adding to user profile' }))
      } else {
        Book
          .create(req.body)
        User.findById(req.body._id)
          .then(user => user.books.push(book))

          .then(res.status(201).send({ book, message: 'New book added to library, adding to user profile' }))
      }
    })

    .catch(err => res.send(err))

}

module.exports = {
  addBook
}