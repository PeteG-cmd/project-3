
const User = require('../models/user')
const Image = require('../models/image')

function uploadPhoto(req, res, next) {
  const currentUser = req.currentUser
  console.log(req.body)
  console.log(req.file)

  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.file.path
  })

  newImage.save()
    .then((result) => {
      User.findById(currentUser)
        .then(user => {
          user.image = []
          user.image.push(result)
          return user.set(user)
        })
        .then(user => {
          return user.save()
        })
        .then(user => {
          console.log(user)
          res.status(200).json({
            success: true,
            document: result


          })
        })

    })
    .catch((err) => next(err))

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
}

module.exports = {
  uploadPhoto
}