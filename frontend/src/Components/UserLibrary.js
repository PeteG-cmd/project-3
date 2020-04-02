import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
// import LibraryBookCard from './LibraryBookCard'
import SearchFormMyLibrary from './SearchFormMyLibrary'

class UserLibrary extends React.Component {

  constructor() {
    super()
    this.state = {
      books: null,
      user: null,
      filteredBooks: null,
      query: ''
    }
  }

  componentDidMount() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ books: res.data.books, filteredBooks: res.data.books, user: res.data.user })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleSearch(event) {

    const searchQuery = event.target.value
    const filteredBooks = this.state.books.filter(book => {
      const regex = new RegExp(searchQuery, 'i')
      return book.title.match(regex)
    })
    this.setState({ query: searchQuery, filteredBooks: filteredBooks })
  }

 
  handleDelete(bookId) {

    console.log(this.props)
    axios.delete(`/api/book/${bookId}`,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      // .then(() => this.props.history.push('/mylibrary'))
      .then(window.location.reload())
      .catch(err => console.error(err))
  }

  showBooksRead() {
    document.querySelector('.ShowAllButtonEdit').style.visibility = 'visible'
    document.querySelector('.ShowAllButtonEdit').style.display = 'block'
    console.log(this.state.user)
    // const booksRead = this.state.user.map(book => {
      
    // })
    this.setState({ filteredBooks: this.state.user.booksRead })
  }

  showWishList() {
    document.querySelector('.ShowAllButtonEdit').style.visibility = 'visible'
    document.querySelector('.ShowAllButtonEdit').style.display = 'block'
    this.setState({ filteredBooks: this.state.user.booksWishList })
  }

  showAllBooks() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        document.querySelector('.ShowAllButtonEdit').style.visibility = 'hidden'
        document.querySelector('.ShowAllButtonEdit').style.display = 'none'
        this.setState({ books: res.data.books, filteredBooks: res.data.books, user: res.data.user })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }


  render() {

    if (!this.state.books) return <h1>WAITING FOR BOOKS</h1>

    return <main className="mainMyLibrary">
      <section className="mainMyLibraryContainer">
        <div className="mainMyLibraryContainerHeader">
          <h1 className='MyLibraryTitle'>My Library</h1>
          <SearchFormMyLibrary
            query={this.state.query}
            onChange={() => this.handleSearch(event)}
          />
          <div className="MyLibraryFilterButtons">
            <button className="button FilterButtonEdit" onClick={() => this.showBooksRead()}>Read Books</button>
            <button className="button FilterButtonEdit" onClick={() => this.showWishList()}>Books Wish List</button>
            {/* <button className="button FilterButtonEdit">Liked Categories</button> */}
            <button className="button FilterButtonEdit">Rated Books</button>
            <button className="button ShowAllButtonEdit" onClick={() => this.showAllBooks()}>Show All Books</button>
          </div>
        </div>
        <div className="BooksContainer">
          {this.state.filteredBooks.map((book, index) => {
            return <div className="BooksContentContainer" key={index}>
              <div className="BookImageContainer">
                <figure className="MyLibraryBooksFigure">
                  {/* This line below is a one line ternary only rendering if the picture exists. */}
                  {book.thumbnail && <img src={book.thumbnail} className="MyLibraryBooksContent"></img>}
                </figure>
                <div className="BookImageContainerInfo">
                  {book.pageCount && <h5 className="BookImageContainerInfoContent"><strong>Page Count:</strong> {book.pageCount}</h5>}
                  {book.language && <h5 className="BookImageContainerInfoContent"><strong>Language:</strong> {book.language}</h5>}
                  {book.categories && <h5 className="BookImageContainerInfoContent"><strong>Category:</strong> {book.categories}</h5>}
                </div>
              </div>
              <div className="TitleandAuthorInfo">
                <h4 className="LBCTheTitle">{book.title}</h4>
                <div className="TheAuthor">
                  {book.author && <h5 className="Author"><strong>{book.author}</strong></h5>}
                </div>
              </div>
              <div className="LibraryBookCardButtons">
                <button
                  onClick={() => this.handleDelete(book._id)}
                  className="button DeleteMyLibraryBook">Delete Book
                </button>
                <Link to={`../books/${book._id}`} book={book}>
                  <button
                    className="button AddCommentMyLibraryBook">Add Comment
                  </button>
                </Link>
              </div>
            </div>
          })}
        </div>
      </section>
    </main>
  }

}

export default UserLibrary