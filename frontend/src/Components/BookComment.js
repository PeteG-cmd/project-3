import React from 'react'
import axios from 'axios'

class BookComment extends React.Component {

  constructor() {
    super()
    this.state = {
      comment: null,
      errors: {}
    }
  }

  handleSubmit() {
    const bookId = this.props.match.params.book_id
    event.preventDefault()
    axios.post(`/api/book/${bookId}/comments`, this.state.comment)
      .then(res => this.props.history.push('/books/bookId'))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })

  }




  render() {
    return <form onSubmit={() => this.handleSubmit(event)} >
      <br></br>
      <br></br>
      <br></br>
      <label>Add a comment:</label>
      <input onChange={(event) => this.handleChange(event)} type='text' name='comment' >
      </input>
      <button>Submit</button>




    </form>
  }

}

export default BookComment