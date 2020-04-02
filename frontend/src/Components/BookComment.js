import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Spinner } from './Common/Spinner'
import Moment from 'react-moment'

import EditCommentModal from './EditCommentModal'

class BookComment extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null,
      comment: '',
      user: null,
      errors: {}
    }
  }

  

  componentDidMount() {
    this.setState({ book: this.props.databaseBook, user: this.props.user })
  }

  handleSubmit(event) {
    event.preventDefault()
    const bookId = this.state.book._id
    axios.post(`/api/books/${bookId}/comments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ book: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }


  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })
  }

  handleDeleteComment(event, comment) {
    const bookId = this.state.book._id
    const commentId = comment._id
    axios.delete(`/api/book/${bookId}/comment/${commentId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ book: res.data })
      })
  }


  render() {
    if (!this.state.book || !this.state.user) return <Spinner />
    const userId = this.state.user._id
    return <>
      <div className="allComments">
        {this.state.book.comments && this.state.book.comments.map((comment, index) => {
          const dateToFormat = `${comment.createdAt}`
          return <article className="CommentContainer" key={index}>
            <figure className="CommentProfileImage">
              <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png"></img>
              </p>
            </figure>

            <div key={index} className="AComment">
              <div className="CommentsContent">
                <p className="TheComment">{comment.comment}</p>
              </div>
              <div className="CommentUserInfo">
                <div className="IconsandName">
                  <div className="Icons">
                    <a className="IconSymbol">
                      <span className="icon is-small"><i className="fas fa-heart"></i></span>
                    </a>
                    <a className="IconSymbol">
                      <span id="replySymbol" className="icon is-small"><i className="fas fa-reply"></i></span>
                    </a>
                    {comment.user._id === userId && <a className="IconSymbol" onClick={() => this.handleDeleteComment(event, comment)}>
                      <span id="deleteSymbol" className="icon is-small"><i className="fas fa-times"></i></span>
                    </a>}
                    {comment.user._id === userId && <a className="IconSymbol">
                      <EditCommentModal
                        comment={comment}
                        book={this.state.book}
                      />
                    </a>}
                  </div>
                  <div className="CommentUserName">
                    <p className="PostedBy"><strong>Posted By:</strong> {comment.user.username} </p>
                  </div>
                </div>
                <div className="timeStamp">
                  <p className="timeStampInfo"><Moment fromNow>{dateToFormat}</Moment></p>
                </div>
              </div>
            </div>
          </article>
        })}
      </div>

      <div className="addComment">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png"></img>
            </p>
          </figure>
          <div className="media-content">
            <div className="field">
              <div className="control">
                <form onSubmit={() => this.handleSubmit(event)} >
                  <textarea
                    // onFocus={() => this.clearContents()}
                    className="textarea"
                    placeholder="Add a comment..."
                    onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>

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