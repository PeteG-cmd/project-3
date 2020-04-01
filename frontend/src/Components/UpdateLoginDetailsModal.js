import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import auth from '../lib/auth'


const Modal = ({ handleChange, handleSubmit, closeModal, modalState, profile }) => {
  // const { username } = profile
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
          <div className="content">

            <form
              className="form"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">
                  Username
                </label>
                <div className="control has-icons-left">
                  <input
                    type="text"
                    name="username"
                    className="input"
                    onChange={handleChange}
                    value={profile.profile.username}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Email
                </label>
                <div className="control has-icons-left">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    className="input"
                    value={profile.profile.email}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Password
                </label>
                <div className="control has-icons-left">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="input"
                    value={profile.profile.password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

            </form>

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

class UpdateLoginDetailsModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false,
      profile: {}
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    this.setState({ profile: this.props })
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.profile, [name]: value }
    this.setState({ profile: data })
    console.log(this.state.profile)
  }

  handleSubmit(event) {
    // console.log('Hello')
    event.preventDefault()
    axios.put('/api/profile', 
      this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        location.reload()
        // console.log(res.data)
        // this.setState({ user: res.data })
      })
  }

  // This is the render of the modal button will appear on the profile page
  render() {
    return (
      <div className="has-text-centered content">
        <a id="booksClubprofileButton"
          className="button is-light is-danger"
          onClick={this.toggleModal}>
          Edit
        </a>

        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          profile={this.state.profile}
          handleChange={(event) => this.handleChange(event)}
          handleSubmit={(event) => this.handleSubmit(event)}
        ></Modal>
      </div>
    )
  }

}

export default UpdateLoginDetailsModal