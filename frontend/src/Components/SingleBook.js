import React from 'react'
import axios from 'axios'
import SearchBookCard from './SearchBookCard'
// import auth from '../lib/auth'
// import { Link } from 'react-router-dom'

class SingleBook extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null
      // googleId: '',
      // title: '',
      // isbn10Number: '',
      // isbn13Number: '',
      // description: '',
      // author: '',
      // imageUrl: '',
      // publishedDate: '',
      // publisher: '',
      // pageCount: '',
      // averageRating: '',
      // genre: ''

    }
  }

  componentDidMount() {
    const googleId = this.props.match.params.googleId
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=id:${googleId}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
      .then(res => this.setState({ book: res.data.items[0] }))
      // .then(res => )
      .catch(error => console.error(error))
  }

  render() {
    console.log(this.state.book)
    if (!this.state.book) return <h1>Waiting for Book</h1>
    return <section className="section">
      <SearchBookCard book={this.state.book} />
    </section>
  }

}

export default SingleBook






