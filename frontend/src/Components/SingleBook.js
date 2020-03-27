import React from 'react'
import axios from 'axios'
// import auth from '../lib/auth'
// import { Link } from 'react-router-dom'

class SingleBook extends React.Component {

  constructor() {
    super()
    this.state = {
      book: {
        title: '',
        ISBNNumber: '',
        description: '',
        author: '',
        imageUrl: '',
        publishedDate: '',
        publisher: '',
        pageCount: '',
        averageRating: '',
        genre: ''
      }
    }
  }

  componentDidMount() {
    const googleId = this.props.match.params.googleId
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${googleId}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
      .then(res => this.setState({ book: res.data }))
      .catch(error => console.error(error))
  }

  render() {
    return <section className="section">
      <h1>Hello</h1>
    </section>
  }

}

export default SingleBook






