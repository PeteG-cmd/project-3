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

    return <section className="theSingleBookContainer">
      <div>
        <figure>
          {/* This line below is a one line ternary only rendering if the picture exists. */}
          {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} className="BookCardImg"></img>}
        </figure>
      </div>
      <div className="theBookInfoContainer">
        <h5>{book.volumeInfo.title} </h5>
        <div id="showModalButton">
          <DescriptionModal
            title={title}
            description={description}
          />
        </div>
        <form>
          <button
            onClick={(event) => this.handleSubmit(event)}
          >Add Book</button>
        </form>
      </div>
    </section>

  }

}



export default SingleBook






