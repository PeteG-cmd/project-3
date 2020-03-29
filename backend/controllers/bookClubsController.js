
const User = require('../models/user')
const Book = require('../models/book')
const BookClub = require('../models/bookClub')


function create(req, res) {
  req.body.user = req.currentUser
  req.body.members = req.currentUser

  BookClub
    .create(req.body)
    .then(bookClub => res.status(201).send(bookClub))
    .catch(err => res.status(401).send(err))

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
  req.body.user = req.currentUser

  //I AM WORKING HERE - I NEED TO FIND ALL WHERE MEMBERS ARRAY INCLUDES THE USER

}

module.exports = {
  create,
  index,
  get,
  myBookClubs
}