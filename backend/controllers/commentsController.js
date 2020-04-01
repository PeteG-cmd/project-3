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


// New
function editBookComment(req, res) {
  // Steps: Get the book, get the comment, edit the comment, save!
  const currentUser = req.currentUser
  console.log(req.body)
  Book
    .findById(req.params.book_id)
    .then(book => {
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      const comment = book.comment.id(req.params.comment_id)
      console.log(comment)
      console.log(req.body)
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



// New///
function deleteBookComment(req, res) {
  const currentUser = req.currentUser
  Book
    .findById(req.params.book_id)
    .then(book => {
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      const comment = book.comments.id(req.params.comment_id)
      if (!comment.user.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      req.body.comment = 'This comment has been deleted'
      comment.set(req.body)
      return book.save()
    })
    .then(book => res.status(202).send(book))
    .catch(error => res.send(error))
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
  addBookClubComment,
  deleteBookComment,
  editBookComment
}

