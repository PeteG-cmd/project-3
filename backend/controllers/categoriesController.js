// Code goes here

const Catergory = require('../models/catergory')
const User = require('../models/user')

function addCategories(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req.body)
  User.findById(req.body.user._id)
    .then(user => {
      if (!user) return res.status(404).send({ message: 'This user does not exist' })
      user.categories = []
      req.body.categories.map(myCategory => {
        user.categories.push({ category: myCategory })
      })
      return user.save()
      
    })
    .then(user => res.status(201).send(user))
    .catch(err => res.send(err))

}

function getCategories(req, res) {
  const currentUser = req.currentUser
  req.body.user = currentUser
  console.log(req)
  console.log(req.body.user._id)
  User.findById(req.body.user._id)
    .then(user => {
      if (!user) return res.status(404).send({ message: 'This user does not exist' })
      res.status(201).send(user)
    })
    .catch(err => res.send(err))

}


module.exports = {
  addCategories,
  getCategories
}