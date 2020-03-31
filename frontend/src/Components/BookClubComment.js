import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'

class BookClubComment extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClub: null,
      comment: '',
      error: ''
    }
  }

  componentDidMount() {
    console.log(this.props.bookClub)
    this.setState({ bookClub: this.props.bookClub })

  }

  handleSubmit(event) {
    event.preventDefault()
    const bookClubId = this.state.bookClub._id
    axios.post(`/api/bookclub/${bookClubId}/comments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ bookClub: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })

  }




  render() {
    if (!this.state.bookClub) return <Spinner />
    return <>
      <div className="allComments">
        <article className="CommentContainer">
          <figure className="CommentProfileImage">
            <p className="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png"></img>
            </p>
          </figure>
          {this.state.bookClub.comments && this.state.bookClub.comments.map((comment, index) => {
            return <div key={index} className="AComment">
              <div className="CommentsContent">

                <p>{comment.comment}</p>
                <p>Posted By: {comment.user.username}</p>

              </div>
              <div className="LikeandReply">
                <a className="Commenticons">
                  <span className="icon is-small"><i className="fas fa-reply"></i></span>
                </a>
                <a className="Commenticons">
                  <span className="icon is-small"><i className="fas fa-heart"></i></span>
                </a>
              </div>
            </div>
          })}
        </article>

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
                  <textarea className="textarea" placeholder="Add a comment..." onChange={(event) => this.handleChange(event)} type='text' name='comment' comment={this.state.comment}>
                  </textarea>
                  {this.state.error && <small className="help is-danger">
                    {this.state.error} </small>}
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

export default BookClubComment