import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Spinner from './Common/Spinner'


class SlickCarousel extends React.Component {
  constructor() {
    super()
    this.state = {
      bookList: null

    }
  }
  componentDidMount() {
    axios
      .get(
        'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=xnqPkpbQTWj1Fg96GhJlFbplC0GMseLd',
      )
      .then(res => {
        this.setState({ bookList: res.data.results.books })
        console.log(res.data)
        console.log('Hello')

      })

      .catch(err => console.error(err))


  }
  render() {
    if (!this.state.bookList) return <> <h1> WAITING FOR BOOKS  <Spinner /> </h1></>

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: 'linear'
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