import React from 'react'
import axios from 'axios'
import SingleBookBookCard from './SingleBookBookCard'
import auth from '../lib/auth'
// import { Link } from 'react-router-dom'

class SingleBook extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null,
      submitDetails: {
        webId: '',
        title: '',
        isbnNumber: '',
        author: ''
      }
    }
  }

  componentDidMount() {
    const webId = this.props.match.params.webId
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=id:${webId}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
      .then(res => {
        this.setState({ book: res.data.items[0] })
        this.updateDetails(res.data.items[0])
      })

      .catch(error => console.error(error))
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/myLibrary', this.state.submitDetails, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        this.props.history.push('/mylibrary')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  updateDetails(data) {

    const neededIsbn = []
    data.volumeInfo.industryIdentifiers.map(isbn => {
      neededIsbn.push(isbn.identifier)
    })

    neededIsbn.sort()
    console.log(neededIsbn)
    neededIsbn.shift()
    console.log(neededIsbn)


    const submitDetails = {
      webId: data.id,
      title: data.volumeInfo.title,
      isbnNumber: neededIsbn[0],
      author: data.volumeInfo.authors[0]
    }
    this.setState({ submitDetails })
  }

 

  render() {
    console.log(this.state)
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






