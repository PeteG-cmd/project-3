import React from 'react'
import axios from 'axios'
import SingleBookBookCard from './SingleBookBookCard'
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

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/books/new', this.state.data)
      .then(res => {
        this.props.history.push('/profile')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    if (!this.state.book) return <h1>Waiting for Book</h1>
    return <div className="container">
      <section className="section">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-one-third"></div>
            <div className="column is-block">
              <div className="box">
                <SingleBookBookCard
                  book={this.state.book}
                  onSubmit={(event) => this.handleSubmit(event)}
                  title={this.state.book.volumeInfo.title}
                  description={this.state.book.volumeInfo.description}
                />
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </section>
    </div>
  }

}

export default SingleBook






