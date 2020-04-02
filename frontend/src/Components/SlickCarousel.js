import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import { CarouselSpinner } from './Common/Spinner'
import lodash from 'lodash'
import { Redirect } from 'react-router-dom'


class SlickCarousel extends React.Component {
  constructor() {
    super()
    this.state = {
      bookList: [],
      dots: true,
      redirect: null,
      searchRedirect: null,
      book: null

    }
  }
  componentDidMount() {
    setTimeout(() => {
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
        this.setState({ dots: false })
        axios
          .get(
            `https://api.nytimes.com/svc/books/v3/lists/current/${categories}.json?api-key=xnqPkpbQTWj1Fg96GhJlFbplC0GMseLd`,
          )
          .then(res => {
            this.setState({ bookList: res.data.results.books })
            console.log(res.data)

          })
          .catch(err => console.error(err))
      }

    }, 2000)
  }

  handleClick(book) {
    console.log(book)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.primary_isbn13}`)
      .then(res => {

        if (!(res.data.items)) return this.setState({ searchRedirect: { title: book.title } })
        if (res.data.items[0].volumeInfo.title.toLowerCase() !== book.title.toLowerCase()) return this.setState({ searchRedirect: { title: book.title } })
        const linkTo = res.data.items[0].id
        this.setState({ redirect: linkTo, book: res.data.items[0] })

      })

      .catch(error => console.error(error))
  }


  render() {
    console.log(this.state.searchRedirect)
    const webId = this.state.redirect
    if (this.state.redirect) return <Redirect to={`/book/${webId}`} book={this.state.book} />
    if (this.state.searchRedirect) return <Redirect to={'/books/new'} searchQuery={this.state.searchRedirect} />
    if (this.state.bookList.length === 0) return <div className="CarouselSpinner"><CarouselSpinner /></div>

    const settings = {
      dots: this.state.dots,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: 'linear',
      pauseOnHover: false
    }
    return (


      <Slider {...settings}>
        {this.state.bookList.map((book, index) => {
          return <figure key={index} className="CarouselImgDiv">
            {/* <h3>{book.title}</h3> */}
            <img
              src={book.book_image}
              alt={`${book.title} by ${book.author}`}
              className="CarouselImg"
              onClick={() => this.handleClick(book)}
            />
          </figure>
        })}
      </Slider>


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