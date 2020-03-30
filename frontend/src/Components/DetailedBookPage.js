import React from 'react'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'
import auth from '../lib/auth'
import BookComment from './BookComment'
import StarRating from './Common/StarRating'


class DetailedBookPage extends React.Component {

  constructor() {
    super()
    this.state = {
      databaseBook: null,
      book: null
    }
  }

  componentDidMount() {
    const id = this.props.match.params.book_id
    axios.get(`/api/book/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data.isbnNumber)
        this.setState({ databaseBook: res.data })
        return res.data.isbnNumber
      })
      .then(res => {
        console.log(res)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${res}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
          .then(res => {
            console.log(res)
            this.setState({ book: res.data.items })
          })
      })
      .catch(error => console.error(error))
  }

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
              <div className="userRating">
                <h3><strong>User Average Rating:</strong> ⭐️⭐️⭐️⭐️</h3>
              </div>
              <div className="yourRating">
                <StarRating></StarRating>
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
                  {book[0].volumeInfo.averageRating && <li className="generalRatingsListItem"><span className="ratingsListTitle">Average Rating:</span> {book[0].volumeInfo.averageRating}</li>}
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
              <div><h3>Add Book To Wish List: <a>
                <span className="icon is-small"><i className="fas fa-heart"></i></span>
              </a></h3></div>
              <div><h3>Add to Read Books: <a>
                <span className="icon is-small"><i className="fas fa-book-open"></i></span>
              </a></h3></div>
              <div><h3>Add <strong>{book[0].volumeInfo.categories}</strong> to Liked Categories: <a>
                <span className="icon is-small"><i className="fas fa-book"></i></span>
              </a> </h3></div>
            </div>
          </div>
        </section>
        <section className="theDetailedBookInfocontainer" id="theDetailedBookInfocontainer2">
          <BookComment />
        </section>
      </div>
    </main>

  }
}


export default DetailedBookPage