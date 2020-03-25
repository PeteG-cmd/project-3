// secureRoute used to check the validity of a users token and retrive the user from the database

//Need to complete address for user once confirmed by Pete
const User = require('../models/user')
const { secret } = require('../config/enviroment')
const jwt = require('jsonwebtoken')

// This will ruun each time a user enters a private route - could be POST, PUT or Delete
function secureRoute(req, res, next) {
  // get the token from the request header
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    // if we get here we knoe token not valid
    return res.status(401).send({ message: 'Unathorized' })
  }

  // If we get here we know that we have a token that meets basic requirements, but need to check full validity with jwt
  const token = authToken.replace('Bearer ', '')

  // Verify our token, the payload will contain our token data
  jwt.verify(token, secret, (err, payload) => {
    // If this fails then the, unauthorized
    if (err) return res.status(401).send({ message: 'Unathorized' })
    User
      .findById(payload.sub)
      .then(user => {
        // If there is no user then Unathorized
        if (!user) return res.status(401).send({ message: 'Unathorized' })
        // We now have a valid user, which we can attach to our request
        req.currentUser = user
        // Let express know we are done
        next()
      })
      .catch(() => res.status(401).send({ message: 'Unathorized' } ))
  })

}

module.exports = secureRoute
