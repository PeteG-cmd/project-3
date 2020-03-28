import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class BookComment extends React.Component {

  constructor() {
    super()
    this.state = {
      comment: '',
      errors: {}
    }
  }

  handleSubmit() {
    const bookId = this.props.match.params.book_id
    event.preventDefault()
    axios.post(`/api/books/${bookId}/comments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push(`/books/${bookId}`))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })

  }




  render() {
    return <form onSubmit={() => this.handleSubmit(event)} >
      <br></br>
      <br></br>
      <br></br>
      <label>Add a comment:</label>
      <input onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>
      </input>
      <button>Submit</button>




    </form>
  }

}

export default BookComment