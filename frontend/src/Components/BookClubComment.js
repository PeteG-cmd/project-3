import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Spinner } from './Common/Spinner'
import Moment from 'react-moment'
import EditCommentModal from './EditBookClubCommentModal'


class BookClubComment extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClub: null,
      comment: '',
      error: '',
      user: null
    }
  }

  myInterval

  componentDidMount() {
    console.log(this.props.bookClub)
    this.setState({ bookClub: this.props.bookClub })
    setTimeout(() => {
      this.getComments()
    }, 500)
    
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }


  handleSubmit(event) {
    event.preventDefault()
    const bookClubId = this.state.bookClub._id
    axios.post(`/api/bookclub/${bookClubId}/comments`, this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ bookClub: res.data })
      })
      .catch(err => this.setState({ error: err.response.data.message }))

  }
  getComments() {
    // this.myInterval = setInterval(() => {
    const bookClubId = this.state.bookClub._id
    axios.get(`/api/bookclub/${bookClubId}/comments`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        // res.data.user.image[0].imageData = res.data.user.image[0].imageData.split('/')[2]
        this.setState({ bookClub: res.data, user: this.props.user })
      })
      .catch(err => this.setState({ error: err.response.data.message }))

    // }, 3000)

  }



  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })

  }

  handleDeleteComment(event, comment) {
    const bookClubId = this.state.bookClub._id
    console.log(bookClubId)
    const commentId = comment._id
    axios.delete(`/api/bookclub/${bookClubId}/comment/${commentId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ bookClub: res.data })
      })
  }

  render() {

    if (!this.state.bookClub || !this.state.user) return <Spinner />
    const userId = this.state.user._id
    console.log(this.state)
    return <>
      <div className="allComments">
        {this.state.bookClub.comments && this.state.bookClub.comments.map((comment, index) => {
          // {comment.user.image[0].imageData = comment.user.image[0].imageData.split('/')[2]}
          const dateToFormat = `${comment.createdAt}`
          return <article className="CommentContainer" key={index}>
            <figure className="CommentProfileImage">
              <p className="image is-64x64">
                <img src={`http://localhost:8000/static/${comment.user.image[0].imageData.split('/')[2]}`}></img>
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
                        bookclub={this.state.bookClub} />

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
          {/* <figure className="media-left">
            <p className="image is-64x64">
              <img src={`http://localhost:8000/static/${this.state.user.image[0].imageData}`}></img>
            </p>
          </figure> */}
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

export default BookClubComment