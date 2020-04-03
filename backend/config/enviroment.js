// file for all of the enviroment varaiables that will be shared in the app

const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-club-db'


const secret = 'Forget Piri Piri we got the secret sauce'

module.exports = {
  secret,
  port,
  dbURI
}





