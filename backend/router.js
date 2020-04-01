
const router = require('express').Router()
const booksController = require('./controllers/booksController')
const categoriesController = require('./controllers/categoriesController')

const userController = require('./controllers/userController')
const bookClubsController = require('./controllers/bookClubsController')
const commentsController = require('./controllers/commentsController')

// Used for members only routes
const secureRoute = require('./lib/secureRoute')


// User routes
router.route('/register')
  .post(userController.register)
router.route('/login')
  .post(userController.login)
router.route('/profile')
  .post(secureRoute, userController.getProfile)
  .put(secureRoute, userController.updateProfile)

router.route('/categories')
  .post(secureRoute, categoriesController.addCategories)
  .get(secureRoute, categoriesController.getCategories)
  // .delete(secureRoute, categoriesController.deleteCategories)
//   .put(secureRoute, catergoriesController.editCatergories)   // Check Peter's function name



// Book Routes
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

router.route('/bookclub/:bookclub_id/remove')
  .post(secureRoute, bookClubsController.removeMember)

router.route('/bookclub/:bookclub_id/comments')
  .post(secureRoute, commentsController.addBookClubComment)

router.route('/bookclubs/mybookclubs')
  .get(secureRoute, bookClubsController.myBookClubs)

router.route('/bookclub/:bookclub_id/comment/:comment_id')
  .put(secureRoute, commentsController.editBookClubComment)
  .delete(secureRoute, commentsController.deleteBookClubComment)


module.exports = router