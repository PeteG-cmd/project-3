import React from 'react'
import { Link } from 'react-router-dom'

const SearchBookCard = ({ book }) => {

  return (
    <div className="column is-one-fifth-desktop is-one-third-tablet is-one-half-mobile">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book.volumeInfo.imageLinks && <Link to={`../book/${book.id}`}><img src={book.volumeInfo.imageLinks.thumbnail} className="BookCardImg"></img></Link>}
          </figure>

        </div>
        <div className="card-content">
          <h4 className="card-title">{book.volumeInfo.title}</h4>
          {book.volumeInfo.authors && <h5 className='subtitle'><strong>{book.volumeInfo.authors[0]}</strong></h5>}
        </div>
      </div>
    </div>
  )
}

export default SearchBookCard


