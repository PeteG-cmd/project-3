const mongoose = require('mongoose')
const Comment = require('./models/comment')
const User = require('./models/user')
const Book = require('./models/book')
const BookClub = require('./models/bookClub')
const Invite = require('./models/invite')
const Category = require('./models/catergory')

const { dbURI, port } = require('./config/enviroment')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error, db) => {
    if (error) {
      return console.log(error)
    }
    console.log('Successfully connected to mongo!')
    db.dropDatabase()
      .then(() => {
        // Creates our users, then passes them down the chain
        return User.create([
          {
            username: 'Gordon',
            email: 'gordon@gordon.com',
            password: 'testG',
            passwordConfirmation: 'testG',
            userBio: 'Hello, My name is Gordon'
          },
          {
            username: 'Jamie',
            email: 'jamie@jamie.com',
            password: 'testJ',
            passwordConfirmation: 'testJ',
            userBio: 'Hello, My name is Jamie'
          },
          {
            username: 'Pete',
            email: 'pete@pete.com',
            password: 'testP',
            passwordConfirmation: 'testP',
            userBio: 'Hello, My name is Pete'
          }
        ])
      })
      // .then(users => {
      //   return Comment.create([
      //     {
      //       name: 'Nick\'s pancake',
      //       style: 'Scotch Pancake',
      //       fluffiness: 3,
      //       user: users[0] // associate every pancake with a user
      //     },
      //     {
      //       name: 'Mia\'s pancake',
      //       style: 'Crêpe',
      //       fluffiness: 4,
      //       user: users[0]
      //     },
      //     {
      //       name: 'Chris\'s pancake',
      //       style: 'Potato Pancake',
      //       fluffiness: 1,
      //       user: users[1]
      //     },
      //     {
      //       name: 'Michael\'s pancake',
      //       style: 'Irish Boxty',
      //       fluffiness: 3,
      //       user: users[1]
      //     },
      //     {
      //       name: 'Jonny\'s pancake',
      //       style: 'American',
      //       fluffiness: 2,
      //       user: users[1]
      //     }
      //   ])
      // })
      .then(users => console.log(`${'🥞'.repeat(users.length)} created`))
      .then(() => console.log('Goodbye!'))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })
