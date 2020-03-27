import React from 'react'
import axios from 'axios'
// import ShowModal from './MovieModal'
import SearchFormAddBook from './SearchFormAddBook'
import SearchBookCard from './SearchBookCard'

class SearchNewBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      query: ''
    }
    // this.fetchBooks = this.fetchBooks.bind(this)
  }

  handleSearch(event) {
    let query = event.target.value
    query = query.split(' ').join('+')
    console.log(query)
    this.setState({ query })
  }

  fetchBooks(event) {
    if (this.state.query.length > 4) {
      event.preventDefault()
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.query}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`,
        )
        .then(res => {

          console.log(res)
          this.setState({ books: res.data.items })
        })
    }
  }

  render() {
    return (
      <> <main className="searchBookMain">
        <section className="BooksIndex">
          {/* { to center later } */}
          <SearchFormAddBook
            // query={this.state.query}
            value={this.state.query}
            onChange={event => {
              this.handleSearch(event)
              this.fetchBooks(event)
            }
            }
          />
          {this.state.books &&
            <div className="section">
              <div className="container">
                <div className="columns is-multiline is-mobile">
                  {this.state.books.map((book, index) => {
                    if ((book.volumeInfo.industryIdentifiers)) {
                      if (!(book.volumeInfo.industryIdentifiers[0].type === 'OTHER')) {
                        console.log(book)
                        return <SearchBookCard key={index} book={book} />
                      }
                    }
                  })}
                </div>
              </div>
            </div>}
          {(!this.state.books && <p>No Books Found</p>)}
        </section>
      </main>
      </>
    )
  }
}

export default SearchNewBooks