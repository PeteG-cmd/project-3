// Code goes here

const Catergory = require('../models/catergory')

function catergories(req, res) {
  Catergory
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.status(401).send(error))
}


module.exports = {
  catergories
}