import React from 'react'

const NewBookCard = ({ volumeInfo }) => {

  console.log(volumeInfo)
  
  return (
    <div className="column is-one-fifth-desktop is-one-third-tablet is-one-half-mobile">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{volumeInfo.title}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            {volumeInfo.imageLinks && <img src={volumeInfo.imageLinks.smallThumbnail}></img>}
          </figure>
        </div>
        <div className="card-content">
          <h5 className='title'>{volumeInfo.authors}</h5>
        </div>
      </div>
    </div>
  )
}

export default NewBookCard