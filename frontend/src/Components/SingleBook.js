import React from 'react'
import axios from 'axios'
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
        author: '',
        thumbnail: '',
        pageCount: Number,
        language: '',
        categories: ''
      }
    }
  }

  componentDidMount() {
    const webId = this.props.match.params.webId
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=id:${webId}`)
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
      author: data.volumeInfo.authors[0],
      thumbnail: data.volumeInfo.imageLinks.thumbnail,
      pageCount: data.volumeInfo.pageCount,
      language: data.volumeInfo.language,
      categories: data.volumeInfo.categories[0]
    }
    this.setState({ submitDetails })
  }



  render() {
    console.log(this.state)
    if (!this.state.book) return <h1>Waiting for Book</h1>

    const book = this.state.book

    return <main className="SingleBookMain">
      <section className="SingleBookContainer">
        <figure id="SingleBookImg">
          {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} id="TheSingleBookImg"></img>}
        </figure>
        <div className="SingleBookInfo">
          <h1 className="SingleBookTitle"><span id="SingleBookTitleEdit">Book Title:</span> {book.volumeInfo.title}</h1>
          <div className="SingleBookJuicyInfo">
            {book.volumeInfo.authors && <h3><strong>Author:</strong> {book.volumeInfo.authors[0]}</h3>}
            {book.volumeInfo.publisher && <h3><strong>Publisher:</strong> {book.volumeInfo.publisher}</h3>}
            {book.volumeInfo.publishedDate && <h3><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</h3>}
            {book.volumeInfo.pageCount && <h3><strong>Page Count:</strong> {book.volumeInfo.pageCount}</h3>}
            {book.volumeInfo.categories && <h3><strong>Category:</strong> {book.volumeInfo.categories[0]}</h3>}
          </div>
          <div className="BookDescription">
            <h3 id="SingleBookDescriptionTitle">Description</h3>
            <div id="DescriptionContent">
              <p>{book.volumeInfo.description}</p>
            </div>
          </div>
          <div className="AddBookButton">
            <form>
              <button 
                onClick={(event) => this.handleSubmit(event)}
                className="button"
                id="TheBookBomb"
              >
                Add Book To Library
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>

  }

}



export default SingleBook



