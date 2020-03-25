# project-3


DATABASES

//USER

  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, minLength: 8, unique: true },
  password: { type: String, required: true, hide: true },
  booksRead: [book ids],
  bookWishlist: [book ids],
  rated books: [{book id, rating }] // think about this
  likedCatagories: []
  virualBookClubs: [ids],
  invites: []


//VIRTUAL BOOK CLUBS

its own id,
A description of the book club
bookclubName
A list of user ids
comments,
invites: []



//CATEGORIES

This will hold the categories from the NY times list



//BOOKS

Title,
ISBN Number,
Description, //this is the quick description of storyline
Author,
ImageUrl, //big thumnail
publisher,
published Date,
page Count,
average rating,
genre, //this is called the category in the API



//COMMENTS - WILL BELONG TO A BOOK AND HAVE A USER ID

Text 
WILL BELONG TO A BOOK AND HAVE A USER ID //NOT RQUIRED
WILL BELONG TO A BOOK CLUB // NOT REQUIRED
DateTime



//INVITES

WILL BE ITS OWN SCHEMA BUT WILL HOLD USER ID AND BOOKCLUB ID //THINK ABOUT THIS 
DateTime




ROUTES

USER ROUTES

api/register POST
api/login POST
api/profile/:user_id GET

CATEGORIES ROUTES

api/categories GET => Shows the categories
api/categories/:userId POST / PUT => add the categories for the user (If a user does not supply any values all categories all will be applied, and this will somehow be flagged to the user)




api/home GET  (THEN OUR SERVER WILL GET RECOMENDATIONS BASED ON CATEGORIES FROM NY TIMES)

api/books/new POST =>

(Check if the book is already in our library, and if it is, only add the user reference, and also has a checkbox to say if this is a book they have read, or is on their wishlist) => We then direct back to profile, where the book appears and then has button where they can add a comment. When thewy click on the book it takes them to the book page, where all comments about that book are visible. 

api/book/:book_id => will take you to the book page where comments are possible and viewable. If you are not logged in then you cant comment

api/book/:book_id/comments POST / PUT /DELETE=> post a new comment



api/bookclub/new POST => create a new book club
api/bookclubs GET => get a list of all book clubs
api/bookclub GET => displaying the bio of the bookclub and requesting join. this could potentially be a modal.
api/bookclubs/myBookclubs => GET / DELETE
api/bookclubs/myBookClubs/:bookclubID POST => THIS IS TO JOIN & send the invite request
api/bookclubs/myBookClubs/:bookclubId/comments POST => Add a comment on a book club if authorised















