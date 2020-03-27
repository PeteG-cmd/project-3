import React from 'react'
import DescriptionModal from './DescriptionModal'

const SingleBookBookCard = ({ book, title, description, onSubmit }) => {
  return (
    <div className="card">
      <div className="card-image">
        <div className="card-image">
          <figure className="image">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.smallThumbnail} className="BookCardImg"></img>}
          </figure>
        </div>
        <div className="card-content">
          <h5 className="subtitle">
            {book.volumeInfo.title}
            <div id="showModalButton">
              <DescriptionModal
                title={title}
                description={description}
              />
            </div>
          </h5>
          <form className="form">
            <button
              className="button is-success"
              onClick={onSubmit}
            >Add Book</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default SingleBookBookCard