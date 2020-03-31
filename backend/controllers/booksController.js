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

  Book
    .find({
      _id: {
        $in: currentUser.books
      }
    })
    .then(books => {
      console.log(books)
      res.status(201).send(books)
    })
  // .then(res.status(201).send(userBookIsbns))
  // .catch(err => res.send(err))
}

function getBook(req, res) {

  Book
    .findById(req.params.book_id)
    .populate('comments.user')
    .then(book => res.status(200).send(book))
    .catch(err => res.send(err))

}

function deleteUserBook(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser

  User
    .findById(currentUser._id)
    .then(user => {
      const filterBooks = user.books.filter(book => {
        return book.toString() !== req.params.book_id.toString()
      })
      user.books = filterBooks
      return user.set(user)
    })
    .then(user => {
      return user.save()
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.send(err))
}

function addBooksToBooksRead(req, res) {

  const currentUser = req.currentUser

  User.findById(currentUser._id)
    .then(user => {
      currentUser.booksRead.push(req.body)
      const filterBooks = user.books.filter(book => {
        return book.toString() !== req.body.toString()
      })
      const filterBooksWishList = user.booksWishList.filter(book => {
        return book.toString() !== req.body.toString()
      })
      user.booksWishList = filterBooksWishList
      user.books = filterBooks
      return user.set(user)
    })
    .then(user => {
      user.save()
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.send(err))

}



module.exports = {
  addBook,
  indexBooks,
  getBooks,
  getBook,
  deleteUserBook,
  addBooksToBooksRead
}