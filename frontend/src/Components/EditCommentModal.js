import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import auth from '../lib/auth'

const Modal = ({ handleChange, handleSubmit, closeModal, modalState, comment }) => {
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
            <textarea className="textarea" name="userBio"
              onChange={handleChange}
              placeholder={comment.user}
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
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string
}

class EditCommentModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false,
      book: null,
      comment: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    this.setState({ user: this.props })
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit(event) {
    // console.log('Hello')
    event.preventDefault()
    axios.put('/api/profile',
      this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        // console.log(res.data)
        this.setState({ comment: res.data })
      })
    // .then(() => this.props.history.push('/profile/:user_id'))
    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  // This is the render of the modal button will appear on the profile page
  render() {
    // console.log(this.state.user)
    return (
      <span id="editSymbol" className="icon is-small">
        <a onClick={this.toggleModal}>
          <i className="fas fa-edit"></i>
        </a>

        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          comment={this.state.comment}
        ></Modal>
      </span>
    )
  }

}

export default EditCommentModal