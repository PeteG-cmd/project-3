import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'

class BookComment extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null,
      comment: '',
      errors: {}
    }
  }

  componentDidMount() {
    console.log(this.props.databaseBook)
    this.setState({ book: this.props.databaseBook })

  }

  handleSubmit(event) {
    event.preventDefault()
    const bookId = this.state.book._id
    axios.post(`/api/books/${bookId}/comments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ book: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })

  }




  render() {
    if (!this.state.book) return <Spinner />
    return <>
      <div className="allComments">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              {/* <img src="https://bulma.io/images/placeholders/128x128.png"></img> */}
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              {this.state.book.comments && this.state.book.comments.map((comment, index) => {
                return <div key={index}>
                  <p>{comment.comment}</p>

                </div>
              })}
            </div>
          </div>
        </article>

      </div>

      <div className="addComment">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              {/* <img src="https://bulma.io/images/placeholders/128x128.png"></img> */}
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <div className="control">
                <form onSubmit={() => this.handleSubmit(event)} >
                  <textarea className="textarea" placeholder="Add a comment..." onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>
                  </textarea>
                  <button className="button" id="commentSubmitButton">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  }

}

export default BookComment