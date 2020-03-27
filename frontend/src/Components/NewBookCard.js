import React from 'react'

const NewBookCard = ({ book }) => {

  return (
    <div className="column is-one-quarter-desktop is-one-third-table is-one-half-mobile">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{book.volumeInfo.title}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            <img src={
              book.volumeInfo.imageLinks === undefined
                ? ''
                : `${book.volumeInfo.imageLinks.thumbnail}`
            }
            ></img>
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