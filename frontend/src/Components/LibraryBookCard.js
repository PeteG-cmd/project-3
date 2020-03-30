import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './Common/Spinner'


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
    const id = this.props.book._id
    console.log(this.props)
    if (!this.state.book) return null

    const book = this.state.book

    return <div className="BooksContentContainer">
      <div className="BookImageContainer">
        <figure className="MyLibraryBooksFigure">
          {/* This line below is a one line ternary only rendering if the picture exists. */}
          {book[0].volumeInfo.imageLinks && <Link to={`../books/${id}`} book={book}><img src={book[0].volumeInfo.imageLinks.thumbnail} className="MyLibraryBooksContent"></img></Link>}
        </figure>
        <div className="BookImageContainerInfo">
          {book[0].volumeInfo.pageCount && <h5 className="BookImageContainerInfoContent"><strong>Page Count:</strong> {book[0].volumeInfo.pageCount}</h5>}
          {book[0].volumeInfo.language && <h5 className="BookImageContainerInfoContent"><strong>Language:</strong> {book[0].volumeInfo.language}</h5>}
          {book[0].volumeInfo.categories && <h5 className="BookImageContainerInfoContent"><strong>Category:</strong> {book[0].volumeInfo.categories[0]}</h5>}
        </div>
      </div>
      <div className="TitleandAuthorInfo">
        <h4 className="TheTitle">{book[0].volumeInfo.title}</h4>
        <div className="TheAuthor">
          {book[0].volumeInfo.authors && <h5 className="Author"><strong>{book[0].volumeInfo.authors[0]}</strong></h5>}
        </div>
      </div>
      <div className="DeleteButton">
        <button className="button DeleteMyLibraryBook">Delete Book</button>
      </div>
    </div>

  }

}

export default LibraryBookCard