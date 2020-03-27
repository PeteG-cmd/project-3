import React from 'react'
import axios from 'axios'
// import ShowModal from './MovieModal'
import SearchFormAddBook from './SearchFormAddBook'
import NewBookCard from './NewBookCard'
// import {Link} from 'react-router-dom'

class AddBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      query: ''
    }
    this.fetchBooks = this.fetchBooks.bind(this)
  }

  fetchBooks(event) {
    event.preventDefault()
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.query}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`,
      )
      // .then(({ data: { items } }) => {
      //   const filteredBooks = items.filter(book => {
      //     const regex = new RegExp(this.state.query, 'i')
      //     return book.volumeInfo.title.match(regex)
      //   })
      //   this.setState({
      //     books: filteredBooks
      //   })
      // })
      .then(res => {

        console.log(res)
        this.setState({ books: res.data.items })
      })
  }

  render() {
    return (
      <>
        <section className="BooksIndex">
          {/* { to center later } */}
          <SearchFormAddBook
            query={this.state.query}
            onChange={event => this.setState({ query: event.target.value })}
            handleSearch={this.fetchBooks}
          />

          <div className="section">
            <div className="container">
              <div className="columns is-multiline is-mobile">
                {this.state.books.map((book, index) => {
                  console.log(book)
                  return <NewBookCard key={index} book={book} />
                })}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default AddBooks