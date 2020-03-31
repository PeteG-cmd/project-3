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

function addBookClubComment(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)

  BookClub.findById(req.params.bookclub_id)
    .populate('comments.user')
    .then(bookclub => {
      if (!bookclub) return res.status(404).send({ message: 'Book Not found' })
      bookclub.comments.unshift(req.body)
      return bookclub.save()
    })
    .then(bookclub => res.status(201).send(bookclub))
    .catch(err => res.status(400).send({ message: 'Comments must be at least 20 characters long' }))

}


module.exports = {
  addComment,
  addBookClubComment
}

