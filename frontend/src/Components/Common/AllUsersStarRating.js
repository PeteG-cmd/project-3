import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class AllUsersStarRating extends React.Component {
  constructor() {
    super()

    this.state = {
      rating: null
    }
  }



  render() {
    const { rating } = this.state

    return (
      <div className="DetailedBookAverageUserRating">
        <h3>Average User Rating: {rating} </h3>
        <span id="AverageUserStarRatingComponent">
          <StarRatingComponent
            name="rate2"
            starCount={5}
            value={4}
            editing={false}
          />
        </span>
      </div>
    )
  }
}

export default AllUsersStarRating