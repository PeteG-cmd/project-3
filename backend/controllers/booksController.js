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
      res.status(201).send({ books, currentUser })
    })

}

function getBook(req, res) {

  const user = req.currentUser

  Book
    .findById(req.params.book_id)
    .populate('comments.user')
    .then(book => res.status(200).send({ book, user }))
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
      const filterBooksRead = user.booksRead.filter(book => {
        return book.toString() !== req.params.book_id.toString()
      })
      const filterBooksWishList = user.booksWishList.filter(book => {
        return book.toString() !== req.params.book_id.toString()
      })
      user.books = filterBooks
      user.booksRead = filterBooksRead
      user.booksWishList = filterBooksWishList
      return user.set(user)
    })
    .then(user => {
      return user.save()
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.send(err))
}

function addBookToBooksRead(req, res) {

  const currentUser = req.currentUser
  console.log(req.body._id)

  User.findById(currentUser._id)
    .then(user => {
      if (user.booksRead.includes(req.body._id)) return res.status(400).send({ message: 'This book is already in your Read Books Library ' })
      user.booksRead.push(req.body._id)
      console.log(user.booksRead)
      // const filterBooks = user.books.filter(book => {
      //   console.log(book)
      //   return book.toString() !== req.body._id.toString()
      // })
      const filterBooksWishList = user.booksWishList.filter(book => {
        console.log(book)
        return book.toString() !== req.body._id.toString()
      })
      user.booksWishList = filterBooksWishList
      // user.books = filterBooks
      return user.set(user)
    })
    .then(user => {
      return user.save()
    })
    .then(user => res.status(200).send(user))
    .catch(err => res.send(err))

}

function addBookToWishList(req, res) {

  const currentUser = req.currentUser
  console.log(req.body._id)

  User.findById(currentUser._id)
    .then(user => {
      if (user.booksWishList.includes(req.body._id)) return res.status(400).send({ message: 'This book is already in your Library ' })
      user.booksWishList.push(req.body._id)
      // const filterBooks = user.books.filter(book => {
      //   return book.toString() !== req.body._id.toString()
      // })
      const filterBooksRead = user.booksRead.filter(book => {
        return book.toString() !== req.body._id.toString()
      })
      user.booksRead = filterBooksRead
      // user.books = filterBooks
      return user.set(user)
    })
    .then(user => {
      return user.save()
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
  addBookToBooksRead,
  addBookToWishList
}