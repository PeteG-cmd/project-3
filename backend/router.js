// import, create a new instance of the router
const router = require('express').Router()
const booksController = require('./controllers/booksController')
const categoriesController = require('./controllers/categoriesController')
// const invitesController = require('./controllers/invitesController')
const userController = require('./controllers/userController')
const bookClubsController = require('./controllers/bookClubsController')
const commentsController = require('./controllers/commentsController')

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

  // New Route to update User Profile 
  .put(secureRoute, userController.updateProfile)


router.route('/categories')
  .post(secureRoute, categoriesController.addCategories)
  .get(secureRoute, categoriesController.getCategories)
//   .put(secureRoute, catergoriesController.editCatergories)   // Check Peter's function name



// // Book Routes
router.route('/books/get')
  .get(booksController.indexBooks)

router.route('/book/:book_id')
  .get(secureRoute, booksController.getBook)
  .delete(secureRoute, booksController.deleteUserBook)


router.route('/mylibrary')
  .get(secureRoute, booksController.getBooks)
  .post(secureRoute, booksController.addBook)

router.route('/books/wishlist')
  .post(secureRoute, booksController.addBookToWishList)

router.route('/books/booksRead')
  .post(secureRoute, booksController.addBookToBooksRead)

// router.route('/books/booksRated')
//   .post(secureRoute, booksController, addBookToBooksRated)


// router.route('/books/booksByLikedCategories')
//   .post(secureRoute, booksController, addBookBooksByLikedCategories)



// Book Comment Routes
router.route('/books/:book_id/comments')
  .post(secureRoute, commentsController.addComment)

router.route('/book/:book_id/comment/:comment_id')
  .put(secureRoute, commentsController.editBookComment)
  .delete(secureRoute, commentsController.deleteBookComment)




// // Virtual Book Club Routes
router.route('/bookclubs')
  .post(secureRoute, bookClubsController.create)
  .get(secureRoute, bookClubsController.index)

router.route('/bookclub/requestjoin')
  .post(secureRoute, bookClubsController.addJoinRequest)

router.route('/bookclub/:bookclub_id')
  .get(secureRoute, bookClubsController.get)
  .post(secureRoute, bookClubsController.handleNewMembers)

router.route('/bookclub/:bookclub_id/comments')
  .post(secureRoute, commentsController.addBookClubComment)

router.route('/bookclubs/mybookclubs')
  .get(secureRoute, bookClubsController.myBookClubs)



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