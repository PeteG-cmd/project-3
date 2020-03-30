import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import auth from '../lib/auth'

const Modal = ({ children, closeModal, modalState, user }) => {
  if (!modalState) {
    return null
  }
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Update Bio Details</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">{children}
            <textarea className="textarea"
              placeholder="Existing profile should appear here from user.userBio"
              rows="5">
            </textarea>
          </div>
        </section>
        <footer className="modal-card-foot">
          {/* Need to handleSubmit on save changes below */}
          <button className="button is-success" onClick={closeModal}>Save changes</button>
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

class UpdateBioModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false,
      user: {}
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    // this.setState({ user: this.props })
    this.setState({ user: this.props })
  }

  // handleChange(event) {
  //   const { name, value } = event.target
  //   const data = { ...this.state.data, [name]: value }
  //   this.setState({ data })
  //   console.log(this.state.data)
  // }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   axios.put('/api/register', this.state.data)
  //     .then(() => this.props.history.push('/profile/:user_id'))
  //     .catch(err => this.setState({ errors: err.response.data.errors }))
  // }

  // This is the render of the modal button will appear on the profile page
  render() {
    console.log(this.user)
    return (
      <div className="has-text-centered content">
        <a className="button is-primary" onClick={this.toggleModal}>
          {/* <a className="button is-light is-danger" onClick={this.toggleModal}> */}
          Edit
        </a>

        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          user={this.state.user}

        ></Modal>
      </div>
    )
  }

}

export default UpdateBioModal