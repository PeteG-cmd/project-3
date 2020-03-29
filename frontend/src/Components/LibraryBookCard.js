import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class LibraryBookCard extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null
    }
  }

  componentDidMount() {
    const isbnNumber = this.props.book.isbnNumber
    // console.log(this.props)
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`,
      )
      .then(res => {
        // console.log(res.data.items)
        this.setState({ book: res.data.items })
      })
  }

  render() {
    const webId = this.props.book.webId
    console.log(this.props)
    if (!this.state.book) return <h1>WAITING FOR BOOKS</h1>

    const book = this.state.book

    return <div className="column is-one-fifth-desktop is-one-third-tablet is-one-half-mobile">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book[0].volumeInfo.imageLinks && <Link to={`../books/${webId}`} book={book}><img src={book[0].volumeInfo.imageLinks.thumbnail}></img></Link>}
          </figure>
        </div>
        <div className="card-content">
          <h4 className="card-title">{book[0].volumeInfo.title}</h4>
          {book[0].volumeInfo.authors && <h5 className='subtitle'><strong>{book[0].volumeInfo.authors[0]}</strong></h5>}
        </div>
      </div>
    </div>


  }

}

export default LibraryBookCard