import React from 'react'
import PropTypes from 'prop-types'
const Modal = ({ children, closeModal, modalState, bookDescription }) => {
  if (!modalState) {
    return null
  }
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{bookDescription.title}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">{children}
            <p>{bookDescription.description}</p>
          </div>
        </section>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  )
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string
}
class DescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalState: false,
      bookDescription: {}
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal() {
    this.setState(prev => {
      const newState = !prev.modalState
      return { modalState: newState }
    })
    this.setState({ bookDescription: this.props })
  }

  render() {
    console.log(this.props)
    return (
      <span>
        <a data-name="Aarhus" data-slug="aarhus" onClick={this.toggleModal}>
          <i
            className="fas fa-info-circle"
            
            data-name="Aarhus"
            data-slug="aarhus"
            aria-hidden="true"
          ></i>
        </a>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          bookDescription={this.state.bookDescription}
        ></Modal>
      </span>
    )
  }
}
export default DescriptionModal