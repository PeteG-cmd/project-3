//Need to complete address for user once confirmed by Pete
const User = require('')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/enviroment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.send(error))
}

function login(req, res) {
  // Try and login with email and password
  User
    // Find the user by using the email they're trying to login with
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      // We now know the user is valid, and know that their email & password that they are trying to log in with matches what we have saved

      // jwt creates the token for us
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '8h' })
      res.status(202).send({ message: `Welcome back ${user.username}`, token })
    })

    .catch(error => res.send(error))
}

function profile(req, res) {
  User
  // profile code goes here
}

module.exports = {
  register,
  login,
  profile
}