import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class StarRating extends React.Component {
  constructor() {
    super()

    this.state = {
      rating: 1
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue })
  }

  render() {
    const { rating } = this.state

    return (
      <div className="DetailedBookUserRating">
        <h3>Rate this book:</h3>
        <span id="StarRatingComponent">
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </span>
      </div>
    )
  }
}

export default StarRating