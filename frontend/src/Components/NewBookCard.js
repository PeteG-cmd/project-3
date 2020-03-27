import React from 'react'

const NewBookCard = ({ book }) => {
  
  return (
    <div className="column is-one-fifth-desktop is-one-third-tablet is-one-half-mobile">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{book.volumeInfo.title}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>}
          </figure>
        </div>
        <div className="card-content">
          <h5 className='title'>{book.volumeInfo.authors[0]}</h5>
        </div>
      </div>
    </div>
  )
}

export default NewBookCard