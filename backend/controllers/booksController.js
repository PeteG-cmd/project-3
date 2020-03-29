const User = require('../models/user')
const Book = require('../models/book')


function addBook(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  Book.findOne({ webId: req.body.webId })
    .then(book => {
      if (!book) {
        Book
          .create(req.body)
          .then(newBook => {
            User.findById(req.body.user._id)
              .then(user => {
                user.books.push(newBook)
                return user.save()
              })
              .then(user => res.status(201).send({ user, message: 'Book Created and added to User' }))
              .catch(err => res.status(401).send(err))
          })
      } else {
        Book.findOne({ webId: req.body.webId })
          .then(newBook => {
            User.findById(req.body.user._id)
              .then(user => {
                if (user.books.includes(newBook._id)) {
                  res.status(201).send({ user, message: 'Library already contains this book, and so does the user, forwarding' })
                } else {
                  user.books.push(newBook)
                  return user.save()
                    .then(user => res.status(201).send({ user, message: 'Library already contains this book, however the book has now been added to User' }))
                }
              })
              .catch(err => res.status(401).send(err))
          })
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

function getBooks(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser

  const userBookIsbns = currentUser.books.map(book => {
    return book
  })

  console.log(userBookIsbns)

  // currentUser.books.map(book => {
  Book
    .find({
      _id: {
        $in: userBookIsbns
      }
    })
    .then(books => {
      console.log(books)
      res.status(201).send(books)
    })
  // .then(res.status(201).send(userBookIsbns))
  // .catch(err => res.send(err))
}


module.exports = {
  addBook,
  indexBooks,
  getBooks
}