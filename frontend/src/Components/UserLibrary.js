import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class UserLibrary extends React.Component {

  constructor() {
    super()
    this.state = {
      books: null
    }
  }

  componentDidMount() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ books: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    console.log(this.state.books)
    if (!this.state.books) return <h1>WAITING FOR BOOKS</h1>
    
    return <>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      {this.state.books.map((book, index) => {
        return <h1 key={index}>{book.title}</h1>
      })}
    </>
  }

}

export default UserLibrary