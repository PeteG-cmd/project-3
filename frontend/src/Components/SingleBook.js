import React from 'react'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'
import auth from '../lib/auth'
// import { Link } from 'react-router-dom'

class SingleBook extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null,
      submitDetails: {
        webId: '',
        title: '',
        isbnNumber: '',
        author: ''
      }
    }
  }

  componentDidMount() {
    const webId = this.props.match.params.webId
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=id:${webId}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
      .then(res => {
        this.setState({ book: res.data.items[0] })
        this.updateDetails(res.data.items[0])
      })

      .catch(error => console.error(error))
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/myLibrary', this.state.submitDetails, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        this.props.history.push('/mylibrary')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  updateDetails(data) {

    const neededIsbn = []
    data.volumeInfo.industryIdentifiers.map(isbn => {
      neededIsbn.push(isbn.identifier)
    })

    neededIsbn.sort()
    console.log(neededIsbn)
    neededIsbn.shift()
    console.log(neededIsbn)


    const submitDetails = {
      webId: data.id,
      title: data.volumeInfo.title,
      isbnNumber: neededIsbn[0],
      author: data.volumeInfo.authors[0]
    }
    this.setState({ submitDetails })
  }



  render() {
    console.log(this.state)
    if (!this.state.book) return <h1>Waiting for Book</h1>

    const title = this.state.book.volumeInfo.title
    const description = this.state.book.volumeInfo.description
    const book = this.state.book

    return <main className="mainDetailedBook">
      <div className="theDetailedBookcontainer">
        <section className="theDetailedBookInfocontainer">
          <figure id="DBPFigImg">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} id="DetailedBookPageImg"></img>}
          </figure>
          <div className="theDetailedBookInfo">
            <h1 id="DetailedBookTitle">{book.volumeInfo.title}</h1>
            <div className="theDetailedBookStats">
              <div className="stats" id="generalStats">
                <ul className="generalStatsList">
                  {book.volumeInfo.authors && <li className="generalStatsListItem"><span className="statsListTitle">Author:</span> {book.volumeInfo.authors[0]}</li>}
                  {book.volumeInfo.publisher && <li className="generalStatsListItem"><span className="statsListTitle">Publisher:</span>  {book.volumeInfo.publisher}</li>}
                  {book.volumeInfo.publishedDate && <li className="generalStatsListItem"><span className="statsListTitle">Published Date:</span>  {book.volumeInfo.publishedDate}</li>}
                </ul>
              </div>
              <div className="stats" >
                <div id="descriptionModal">
                  <DescriptionModal
                    title={title}
                    description={description}
                  />
                </div>
                <p className="to-top">Description Above</p>
              </div>
              <div className="stats" id="ratings">
                <ul className="generalRatingsList">
                  {book.volumeInfo.averageRating && <li className="generalRatingsListItem"><span className="ratingsListTitle">Average Rating:</span> {book.volumeInfo.averageRating}</li>}
                  {book.volumeInfo.ratingsCount && <li className="generalRatingsListItem"><span className="ratingsListTitle">Ratings Count:</span>  {book.volumeInfo.ratingsCount}</li>}
                  {book.volumeInfo.language && <li className="generalRatingsListItem"><span className="ratingsListTitle">Book Language:</span>  {book.volumeInfo.language}</li>}
                </ul>
              </div>
            </div>
          </div>
          <form>
            <button
              onClick={(event) => this.handleSubmit(event)}
            >Add Book</button>
          </form>
        </section>
      </div>
    </main>

  }

}



export default SingleBook






