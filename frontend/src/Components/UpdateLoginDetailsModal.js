import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import auth from '../lib/auth'
import RegisterForm from './RegisterForm'

const Modal = ({ children, closeModal, modalState, loginDetails }) => {
  if (!modalState) {
    return null
  }
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Update Login Details</p>
          <button className="delete" onClick={closeModal} />
        </header>

        <section className="modal-card-body">
          <div className="content">{children}
            <p>Form Here</p>
            {/* <RegisterForm
              handleSubmit={(event) => this.handleSubmit(event)}
              handleChange={(event) => this.handleChange(event)}
              errors={errors}
              data={this.state.data}
            /> */}
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

class UpdateLoginDetailsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false,
      loginDetails: {}
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    this.setState({ loginDetails: this.props })
  }

  // New

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

  /////

  // This is the render of the modal button will appear on the profile page
  render() {
    console.log(this.props)
    return (
      <div className="has-text-centered content">
        <a id="booksClubprofileButton" className="button is-light is-danger" onClick={this.toggleModal}>
          Edit
        </a>

        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          // loginDetails={this.state.loginDetails}

        ></Modal>
      </div>
    )
  }

}

export default UpdateLoginDetailsModal