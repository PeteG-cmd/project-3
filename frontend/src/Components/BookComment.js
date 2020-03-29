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
      // .then(res => this.props.history.push(`/books/${bookId}`))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })

  }




  render() {
    return <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png"></img>
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>Barbara Middleton</strong>
              <br></br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
              <br></br>
              <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
            </p>
          </div>
        </div>
      </article>
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png"></img>
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <form onSubmit={() => this.handleSubmit(event)} >
                <textarea className="textarea" placeholder="Add a comment..." onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>
                </textarea>
                <button className="button">Submit</button>
              </form>
            </p>
          </div>
        </div>
      </article>
    </>
  }

}

export default BookComment