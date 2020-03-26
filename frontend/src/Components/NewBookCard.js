import React from 'react'

const NewBookCard = ({ volumeInfo }) => {

  return (
    <div className="column is-one-quarter-desktop is-one-third-table is-one-half-mobile">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{volumeInfo.title}</h4>
        </div>
        {/* <div className="card-image">
          <figure className="image">
            <img src={volumeInfo.imageLinks.thumbnail}></img>
          </figure>
        </div> */}
        <div className="card-content">
          <h5 className='title'>{volumeInfo.authors}</h5>
        </div>
      </div>
    </div>
  )
}

export default NewBookCard