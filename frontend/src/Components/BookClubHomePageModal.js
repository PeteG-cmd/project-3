import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Modal = ({ children, closeModal, modalState, title }) => {
  if (!modalState) {
    return null
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            {children}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={closeModal}><Link to="/bookclub/create">Create Book Club Here</Link></button>
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

class BookClubHomePageModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalState: false
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState

      return { modalState: newState }
    })
  }

  render() {
    return (

      <div className="has-text-centered content">
        <a className="button is-primary" onClick={this.toggleModal}>
          The Book Club
        </a>


        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          title="The Book Club"
        >

        </Modal>
      </div>
    )
  }
}

export default BookClubHomePageModal