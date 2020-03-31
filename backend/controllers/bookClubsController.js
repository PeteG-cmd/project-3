
const User = require('../models/user')
const BookClub = require('../models/bookClub')



function create(req, res) {
  const currentUser = req.currentUser
  req.body.adminUser = req.currentUser
  req.body.members = req.currentUser
  // let bookClub = null

  BookClub
    .create(req.body)
    .then(bookclub => {
      User.findById(currentUser._id)
        .then(user => {
          user.bookClubs.push(bookclub)
          return user.set(user)
        })
        .then(user => {
          return user.save()
        })
        .then(user => res.status(200).send(bookclub))
    })
    .catch(err => res.status(400).send(err))
}

function index(req, res) {
  const currentUser = req.currentUser
  BookClub
    .find()
    .populate('adminUser')
    .then(bookclubs => {
      res.status(201).send({ bookclubs, currentUser })
    })
    .catch(err => res.status(400).send(err))
}

function get(req, res) {
  const id = req.params.bookclub_id

  BookClub
    .findById(id)
    .populate('members')
    .populate('adminUser')
    .populate('joinRequests')
    .populate('comments.user')

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
      // User.findById(bookclub.adminUser)
      //   .then(user => {
      //     console.log(user)
      //   })
      console.log(bookclub)
      res.status(201).send(bookclub)
    })
}

function addJoinRequest(req, res) {

  const currentUser = req.currentUser
  console.log(req.body._id)

  BookClub
    .findById(req.body._id)
    .then(bookclub => {
      if (bookclub.joinRequests.includes(currentUser._id)) return res.status(200).send({ message: 'You have already requested access, and your invite is aweaiting approval by the Book Club Admin', currentUser })
      console.log(bookclub)
      bookclub.joinRequests.push(currentUser)
      return bookclub.set(bookclub)
    })
    .then(bookclub => {
      console.log(bookclub)
      return bookclub.save()
    })
    .then(bookclub => {
      User.findById(currentUser._id)
        .then(user => {
          user.invitesSent.push(bookclub._id)
          return user.set(user)
        })
        .then(user => {
          return user.save()
        })
        .then(user => res.status(202).send({ message: 'Your Request has been sent', bookclub, user }))
    })
    .catch(error => res.send(error))
}

function handleNewMembers(req, res) {
  console.log(req.body)
  const currentUser = req.currentUser

  BookClub
    .findById(req.body.bookClubId)
    .then(bookclub => {
      if (!(currentUser._id.toString() === bookclub.adminUser.toString())) return res.status(401).send({ message: 'Unauthorized ' })

      if (req.body.event === 'accept') {
        bookclub.members.push(req.body.memberId)
        const filterJoinRequests = bookclub.joinRequests.filter(request => {
          return request.toString() !== req.body.memberId.toString()
        })
        console.log(filterJoinRequests)
        bookclub.joinRequests = filterJoinRequests
      } else {
        const filterJoinRequests = bookclub.joinRequests.filter(request => {
          return request.toString() !== req.body.memberId.toString()
        })

        bookclub.joinRequests = filterJoinRequests
      }
      return bookclub.set(bookclub)
    })
    .then(bookclub => {
      return bookclub.save()
    })

    .then(bookclub => {
      User.findById(req.body.memberId)
        .then(user => {
          if (req.body.event === 'accept') {
            user.bookClubs.push(req.body.bookClubId)
          }
          const filterInvitesSent = user.invitesSent.filter(invite => {
            return invite.toString() !== req.body.bookClubId.toString()
          })
          user.invitesSent = filterInvitesSent
          return user.set(user)
        })
        .then(user => {
          return user.save()
        })
        // .then(user => res.status(200).send({ bookclub }))
        .then(user => {
          BookClub
            .findById(req.body.bookClubId)
            .populate('members')
            .then(updatedbookclub => res.status(200).send({ updatedbookclub }))
        })

    })

    .catch(err => res.send(err))

}

module.exports = {
  create,
  index,
  get,
  myBookClubs,
  addJoinRequest,
  handleNewMembers
}