const Comment = require('../models/comment')
const Book = require('../models/book')

function addComment(req, res) {

  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)
  Book.findById(req.params.book_id)
    .then(book => {
      if (!book) return res.status(404).send({ message: 'Book Not found' })
      book.comments.push(req.body)
      return book.save()
    })
    .then(book => res.status(201).send(book))
    .catch(err => res.send(err))
}


module.exports = {
  addComment
}
 
