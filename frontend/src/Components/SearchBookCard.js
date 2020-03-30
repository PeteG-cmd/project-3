import React from 'react'
import { Link } from 'react-router-dom'

const SearchBookCard = ({ book }) => {

  return (
    <div className="SearchBooksContentContainer">
      <div className="SearchBookImageContainer">
        <figure className="SearchBooksFigure">
          {/* This line below is a one line ternary only rendering if the picture exists. */}
          {book.volumeInfo.imageLinks && <Link to={`../book/${book.id}`} book={book}><img src={book.volumeInfo.imageLinks.thumbnail} className="SearchBooksContent"></img></Link>}
        </figure>
        <div className="SearchBookImageContainerInfo">
          {book.volumeInfo.pageCount && <h5 className="SearchBookImageContainerInfoContent"><strong>Page Count:</strong> {book.volumeInfo.pageCount}</h5>}
          {book.volumeInfo.language && <h5 className="SearchBookImageContainerInfoContent"><strong>Language:</strong> {book.volumeInfo.language}</h5>}
          {book.volumeInfo.categories && <h5 className="SearchBookImageContainerInfoContent"><strong>Category:</strong> {book.volumeInfo.categories[0]}</h5>}
        </div>
      </div>
      <div className="SearchTitleandAuthorInfo">
        <h4 className="SearchTheTitle">{book.volumeInfo.title}</h4>
        <div className="SearchTheAuthor">
          {book.volumeInfo.authors && <h5 className="SearchAuthor"><strong>{book.volumeInfo.authors[0]}</strong></h5>}
        </div>
      </div>
    </div>
  )
}

export default SearchBookCard


