const Comment = require('../models/comment')
const Book = require('../models/book')
const BookClub = require('../models/bookClub')

function addComment(req, res) {

  const currentUser = req.currentUser
  req.body.user = currentUser
  Book.findById(req.params.book_id)
    .populate('comments.user')
    .then(book => {
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      book.comments.unshift(req.body)
      return book.save()
    })
    .then(book => res.status(201).send(book))
    .catch(err => res.send(err))
}



function editBookComment(req, res) {
  const currentUser = req.currentUser
  console.log(req.body)
  Book
    .findById(req.params.book_id)
    .then(book => {
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      const comment = book.comments.id(req.params.comment_id)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      req.body.comment += ' - (edited)'
      comment.set(req.body)
      return book.save()
    })
    .then(book => res.status(202).send(book))
    .catch(error => res.send(error))
}

function deleteBookComment(req, res) {
  const currentUser = req.currentUser

  Book
    .findById(req.params.book_id)
    .then(book => {
      console.log(book)
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      const comment = book.comments.id(req.params.comment_id)
      console.log(comment)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      comment.remove()
      return book.save()
    })
    .then(book => res.status(202).send(book))
    .catch(error => res.send(error))
}

function getBookClubComment(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser

  BookClub.findById(req.params.bookclub_id)
    .populate('comments.user')
    .then(bookclub => {
      if (!(currentUser.bookClubs.includes(bookclub._id))) return res.status(400).send({ message: 'Unauthorized' })
      if (!bookclub) return res.status(404).send({ message: 'Book Not found' })
      return bookclub
    })
    .then(bookclub => res.status(201).send(bookclub))
    .catch(err => res.status(400).send({ message: 'An error has occured' }))
}

function addBookClubComment(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)

  BookClub.findById(req.params.bookclub_id)
    .populate('comments.user')
    .then(bookclub => {
      if (!(currentUser.bookClubs.includes(bookclub._id))) return res.status(400).send({ message: 'Unauthorized' })
      if (!bookclub) return res.status(404).send({ message: 'Book Not found' })
      bookclub.comments.unshift(req.body)
      return bookclub.save()
    })
    .then(bookclub => res.status(201).send(bookclub))
    .catch(err => res.status(400).send({ message: 'Comments must be at least 20 characters long' }))
}

function editBookClubComment(req, res) {
  const currentUser = req.currentUser

  BookClub
    .findById(req.params.bookclub_id)
    .then(bookclub => {
      if (!bookclub) return res.status(404).send({ message: 'BookClub Not found' })
      const comment = bookclub.comments.id(req.params.comment_id)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      req.body.comment += ' - (edited)'
      comment.set(req.body)
      return bookclub.save()
    })
    .then(bookclub => res.status(202).send(bookclub))
    .catch(error => res.send(error))
}

function deleteBookClubComment(req, res) {
  const currentUser = req.currentUser

  BookClub
    .findById(req.params.bookclub_id)
    .then(bookclub => {
      console.log(bookclub)
      if (!bookclub) return res.status(404).send({ message: 'BookClub Not found' })
      const comment = bookclub.comments.id(req.params.comment_id)
      console.log(comment)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      comment.remove()
      return bookclub.save()
    })
    .then(bookclub => res.status(202).send(bookclub))
    .catch(error => res.send(error))
}



module.exports = {
  addComment,
  addBookClubComment,
  deleteBookComment,
  editBookComment,
  editBookClubComment,
  deleteBookClubComment,
  getBookClubComment
}

