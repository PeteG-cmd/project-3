import React from 'react'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'
import auth from '../lib/auth'
import BookComment from './BookComment'
import StarRating from './Common/StarRating'
import AllUsersStarRating from './Common/AllUsersStarRating'


class DetailedBookPage extends React.Component {

  constructor() {
    super()
    this.state = {
      databaseBook: null,
      book: null,
      user: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.book_id
    axios.get(`/api/book/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ databaseBook: res.data.book, user: res.data.user })
        return res.data.book.isbnNumber
      })
      .then(res => {
        console.log(res)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${res}`)
          .then(res => {
            console.log(res)
            this.setState({ book: res.data.items })
          })
      })
      .catch(error => console.error(error))
  }

  handleAddToWishList(event) {
    event.preventDefault()
    axios.post('/api/books/wishlist', this.state.databaseBook, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleAddToBooksRead(event) {
    event.preventDefault()
    axios.post('/api/books/booksRead', this.state.databaseBook, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  // handleAddToBooksToLikeCategories(event) {
  //   event.preventDefault()
  //   axios.post('api/books/booksByLikedCategories', this.state.databaseBook._id, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
  //     .then(res => {
  //       this.props.history.push('/mylibrary')
  //     })
  //     .catch(err => this.setState({ error: err.response.data.message }))
  // }


  render() {
    if (!this.state.book) return <h1>WAITING FOR BOOKS</h1>

    const book = this.state.book

    console.log(book)
    return <main className="mainDetailedBook">
      <div className="theDetailedBookcontainer">
        <section className="theDetailedBookInfocontainer" id="theDetailedBookInfocontainer1">
          <div className="ImageandWants">
            <figure id="DBPFigImg">
              {/* This line below is a one line ternary only rendering if the picture exists. */}
              {book[0].volumeInfo.imageLinks && <img src={book[0].volumeInfo.imageLinks.thumbnail} id="DetailedBookPageImg"></img>}
            </figure>

            <div id="titlediv">
              <h1 id="DetailedBookTitle">{book[0].volumeInfo.title}</h1>
              <div className="Ratings">
                <div className="userRating">
                  <AllUsersStarRating />
                </div>
                <div className="yourRating">
                  <StarRating></StarRating>
                  <button className="button">Submit Rating</button>
                </div>
              </div>
            </div>
          </div>
          <div className="theDetailedBookInfo">
            <div className="theDetailedBookStats">
              <div className="stats" id="generalStats">
                <ul className="generalStatsList">
                  {book[0].volumeInfo.authors && <li className="generalStatsListItem"><span className="statsListTitle">Author:</span> {book[0].volumeInfo.authors[0]}</li>}
                  {book[0].volumeInfo.publisher && <li className="generalStatsListItem"><span className="statsListTitle">Publisher:</span>  {book[0].volumeInfo.publisher}</li>}
                  {book[0].volumeInfo.publishedDate && <li className="generalStatsListItem"><span className="statsListTitle">Published Date:</span>  {book[0].volumeInfo.publishedDate}</li>}
                </ul>
              </div>

              <div className="stats" id="ratings">
                <ul className="generalRatingsList">
                  {book[0].volumeInfo.averageRating && <li className="generalRatingsListItem"><span className="ratingsListTitle">Average Public Rating:</span> {book[0].volumeInfo.averageRating}</li>}
                  {book[0].volumeInfo.ratingsCount && <li className="generalRatingsListItem"><span className="ratingsListTitle">Ratings Count:</span>  {book[0].volumeInfo.ratingsCount}</li>}
                  {book[0].volumeInfo.language && <li className="generalRatingsListItem"><span className="ratingsListTitle">Book Language:</span>  {book[0].volumeInfo.language}</li>}
                </ul>
              </div>
            </div>
            <div className="descriptionModal" >
              <div id="descriptionModalInfo">
                <DescriptionModal
                  title={book[0].volumeInfo.title}
                  description={book[0].volumeInfo.description}
                />
              </div>
              <p className="to-top">Description Above</p>
            </div>
            <div className="Addons">
              <div><h3>Add Book To Wish List: <a onClick={(event) => this.handleAddToWishList(event)}>
                <span className="icon is-small"><i className="fas fa-heart"></i></span>
              </a></h3></div>
              <div><h3>Add to Read Books: <a onClick={(event) => this.handleAddToBooksRead(event)}>
                <span className="icon is-small"><i className="fas fa-book-open"></i></span>
              </a></h3></div>
              {/* <div><h3>Add <strong>{book[0].volumeInfo.categories}</strong> to Liked Categories: <a>
                <span className="icon is-small"><i className="fas fa-book"></i></span>
              </a> </h3></div> */}
            </div>
          </div>
        </section>
        <section className="theDetailedBookInfocontainer" id="theDetailedBookInfocontainer2">
          <BookComment databaseBook={this.state.databaseBook} user={this.state.user} />
        </section>
      </div>
    </main>


  }
}


export default DetailedBookPage