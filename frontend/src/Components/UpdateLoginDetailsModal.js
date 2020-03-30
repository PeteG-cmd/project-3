import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, closeModal, modalState, loginDetails }) => {
  if (!modalState) {
    return null
  }
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <p>This is where the Login Update Form will be</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  )
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired
  // title: PropTypes.string
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

}

export default UpdateLoginDetailsModal