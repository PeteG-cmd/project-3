import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Link } from 'react-router-dom'
import LibraryBookCard from './LibraryBookCard'
import SearchFormMyLibrary from './SearchFormMyLibrary'

class UserLibrary extends React.Component {

  constructor() {
    super()
    this.state = {
      books: null,
      filteredBooks: null,
      query: ''
    }
  }



  componentDidMount() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ books: res.data, filteredBooks: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  handleSearch(event) {
    
    const searchQuery = event.target.value
    
    console.log(searchQuery)
    const filteredBooks = this.state.books.filter(book => {
      const regex = new RegExp(searchQuery, 'i')
      return book.title.match(regex)
    })
    this.setState({ query: searchQuery, filteredBooks: filteredBooks })
    console.log(filteredBooks)
  }

  // let query = event.target.value
  // query = query.split(' ').join('+')
  // console.log(query)
  // this.setState({ query })


  render() {
    console.log(this.state.filteredBooks)
    console.log(this.state.query)
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
            <button className="button FilterButtonEdit">Read Books</button>
            <button className="button FilterButtonEdit">Books Wish List</button>
            <button className="button FilterButtonEdit">Liked Categories</button>
            <button className="button FilterButtonEdit">Rated Books</button>
          </div>
        </div>
        <div className="BooksContainer">
          {this.state.filteredBooks.map((book, index) => {
            return <LibraryBookCard book={book} key={index} />
          })}
        </div>
      </section>
    </main>
  }

}

export default UserLibrary