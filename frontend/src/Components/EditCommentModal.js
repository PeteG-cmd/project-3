import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import auth from '../lib/auth'


const Modal = ({ handleChange, handleSubmit, closeModal, modalState, comment, book }) => {
  if (!modalState) {
    return null
  }
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Comment</p>
          <button className="delete" onClick={closeModal} />
        </header>

        <section className="modal-card-body">
          <div className="content">
            <textarea className="textarea"
              name="comment"
              onChange={handleChange}
              placeholder={comment.comment}
              value={comment.comment}

              rows="5">
            </textarea>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSubmit}>Save changes</button>
          <button className="button" onClick={closeModal}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired
  // comment: PropTypes.string
}

class EditCommentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false,
      comment: null
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    this.setState({ comment: this.props.comment })
  }

  handleChange(event) {
    const { name, value } = event.target
    const comment = { ...this.state.comment, [name]: value }
    this.setState({ comment })
    // console.log(this.state.comment)
  }

  handleSubmit(event) {
    // console.log('Hello')
    event.preventDefault()
    const bookId = this.props.book._id
    const commentId = this.props.comment._id
    axios.put(`/api/book/${bookId}/comment/${commentId}`,
      this.state.comment, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        location.reload()

      })
  }


  // This is the render of the modal button will appear on the profile page
  render() {
    console.log(this.state)
    return (
      <span id="editSymbol" className="icon is-small">
        <p onClick={this.toggleModal}>
          <i className="fas fa-edit"></i>
        </p>


        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          comment={this.state.comment}
          handleChange={(event) => this.handleChange(event)}
          handleSubmit={(event) => this.handleSubmit(event)}
        ></Modal>
      </span>
    )
  }

}

export default EditCommentModal