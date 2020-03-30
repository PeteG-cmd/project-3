
const User = require('../models/user')
const BookClub = require('../models/bookClub')


function create(req, res) {
  const currentUser = req.currentUser
  req.body.adminUser = req.currentUser
  req.body.members = req.currentUser
  let bookClub = null

  BookClub
    .create(req.body)
    .then(bookclub => {
      bookClub = bookclub
      currentUser.bookClubs.push(bookclub)
    })
    .then(User
      .findById(currentUser._id)
      .then(user => {
        return user.set(currentUser)
      })
      .then(user => {
        return user.save()
      })
      .then(user => res.status(200).send(bookClub))
    )
    .catch(err => res.status(400).send(err))
}

function index(req, res) {
  BookClub
    .find()
    .then(bookclubs => res.status(201).send(bookclubs))
    .catch(err => res.status(400).send(err))
}

function get(req, res) {
  const id = req.params.bookclub_id

  BookClub
    .findById(id)
    .then(bookclub => res.status(200).send(bookclub))
    .catch(err => res.send(err))
}

function myBookClubs(req, res) {
  
  const currentUser = req.currentUser
  req.body.user = req.currentUser

  BookClub
    .find({
      _id: {
        $in: currentUser.bookClubs
      }
    })
    .then(bookclub => {
      console.log(bookclub)
      res.status(201).send(bookclub)
    })
}

function addJoinRequest(req, res) {

  const currentUser = req.currentUser

  BookClub
    .findById(req.body._id)
    .then(bookclub => {
      bookclub.joinRequests.push(currentUser)
      return bookclub.set(bookclub)
    })
    .then(bookclub => {
      return bookclub.save()
    })
    .then(bookclub => res.status(200).send({ message: "Your Request has been sent"}))
    .catch(error => res.send(error))

}

module.exports = {
  create,
  index,
  get,
  myBookClubs,
  addJoinRequest
}