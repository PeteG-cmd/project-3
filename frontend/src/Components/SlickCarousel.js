import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Spinner from './Common/Spinner'
import lodash from 'lodash'


class SlickCarousel extends React.Component {
  constructor() {
    super()
    this.state = {
      bookList: [],
      dots: true

    }
  }
  componentDidMount() {

    const categories = this.props.categories
    console.log(categories)
    if (Array.isArray(categories)) {

      //This removes the dots from the carousel for a logged in user, as if they have selected a lot of Categories there are too many dots and does not look good.
      this.setState({ dots: false })

      categories.map(category => {
        axios
          .get(
            `https://api.nytimes.com/svc/books/v3/lists/current/${category.category}.json?api-key=xnqPkpbQTWj1Fg96GhJlFbplC0GMseLd`,
          )
          .then(res => {
            let bookList = this.state.bookList.concat(res.data.results.books)
            bookList = _.shuffle(bookList)
            this.setState({ bookList })
            console.log(res.data)
            console.log('Hello')
          })
          .catch(err => console.error(err))

      })

    } else {

      // This puts dots on the Carousel for the default categories if the user is not logged in.
      this.setState({ dots: true })
      axios
        .get(
          `https://api.nytimes.com/svc/books/v3/lists/current/${categories}.json?api-key=xnqPkpbQTWj1Fg96GhJlFbplC0GMseLd`,
        )
        .then(res => {
          this.setState({ bookList: res.data.results.books })
          console.log(res.data)
          console.log('Hello')
        })
        .catch(err => console.error(err))
    }
  }
  render() {
    if (this.state.bookList.length === 0) return <Spinner />

    const settings = {
      dots: this.state.dots,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      pauseOnHover: false
    }
    return (
      <section>
        <div>
          <Slider {...settings}>
            {this.state.bookList.map((book, index) => {
              return <div key={index}>
                <img
                  src={book.book_image}
                  alt={`${book.title} by ${book.author}`}
                />
              </div>
            })}
          </Slider>
        </div>
      </section>
    )
  }
}
export default SlickCarousel


// .then(res => {
//   this.state.bookList.map(book => {
//     const isbn = book.primary_isbn10
//     const myBook = book
//     axios
//       .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
//       .then(res => {
//         console.log(book)
//         const bookList = { ...this.state.bookList, [myBook]: { book_image: res.data.volumeInfo.imageLinks.thumbnail } }
//         this.setState({ bookList })
//       })
//   })
//   console.log(this.state.bookList)
// })