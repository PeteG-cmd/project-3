// import, create a new instance of the router
const router = require('express').Router()
const booksController = require('./controllers/booksController')
const categoriesController = require('./controllers/categoriesController')
// const invitesController = require('./controllers/invitesController')
const userController = require('./controllers/userController')
const virtualBookClubsController = require('./controllers/virtualBookClubsController')

// Used for members only routes
const secureRoute = require('./lib/secureRoute')


// Home route
// router.route('/')
//   .get()

// User routes
router.route('/register')
  .post(userController.register)
router.route('/login')
  .post(userController.login)
router.route('/profile')
  .post(secureRoute, userController.getProfile)




// // Catergory Routes
// router.route('/catergories')
// .get(secureRoute, catergoriesController.catergories)

router.route('/categories')
  .post(secureRoute, categoriesController.addCategories)
  .get(secureRoute, categoriesController.getCategories)
//   .put(secureRoute, catergoriesController.editCatergories)   // Check Peter's function name

// // Book Routes
router.route('/books/new')
  .post(secureRoute, booksController.addBook)

router.route('/books/get')
  .get(booksController.indexBooks)

// router.route('/book/:book_id')
//   .get(booksController.viewComments)   // Check Peter's function name

// router.route('/book/book_id/comments')
//   .post(secureRoute, booksController.addBookComment) // Check Peter's function name
// router.route('/book/book_id/comment/:comment_id')
//   .put(secureRoute, booksController.editComment) // Check Peter's function name
//   .delete(secureRoute, booksController.deleteComment) // Check Peter's function name

// // Virtual Book Club Routes
// router.route('/bookclub/create')
//   .post(secureRoute, virtualBookClubsController.createBookclub) // Check Peter's function name

// router.route('/bookclubs')
//   .get(secureRoute, virtualBookClubsController.bookClubs) // Check Peter's function name

// ///////// Discuss below
// router.route('/bookclub/:bookclub_id')  //Display book club and request to join - added id??
//   .get(secureRoute, virtualBookClubsController.bookClubPage) // Check Peter's function name

// router.route('/bookclubs/mybookclubs')
//   .get(secureRoute, virtualBookClubsController.myBookClubs) // Check Peter's function name

// router.route('/bookclubs/mybookclubs/:bookclub_id')
//   .delete(secureRoute, virtualBookClubsController.deleteMyBookClub) // Check Peter's function name

// // api/bookclubs/myBookClubs/:bookclubID POST => THIS IS TO JOIN & send the invite request??
// router.route('/bookclubs/mybookclubs/:bookclub_id')
//   .post(secureRoute, virtualBookClubsController.joinBookClub)

// // api/bookclubs/myBookClubs/:bookclubId/comments POST => Add a comment on a book club if authorised
// router.route('/bookclubs/mybookclubs/:bookclub_id/comments')
//   .post(secureRoute, virtualBookClubsController.addBookClubComment)

module.exports = router