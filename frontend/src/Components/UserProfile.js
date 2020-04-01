import React from 'react'
import axios from 'axios'

import auth from '../lib/auth'
import { Link } from 'react-router-dom'

import UpdateLoginDetailsModal from './UpdateLoginDetailsModal'
import UpdateBioModal from './UpdateBioModal'

let choices = []

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null,
      profile: {},
      books: null,
      categories: []
    }
  }

  componentDidMount() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ books: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))


    axios.post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res)
        //Maps thru exisiting categories data to populate categories on user profile
        this.setState({ user: res.data })
        const categories = res.data.categories.map((category, index) => {
          return category.category
        })
        this.setState({ categories: categories })
      })
  }

  handleChange(event) {
    choices.push(event.target.value)
    this.setState({ data: { categories: choices } })
    console.log(choices)
  }

  handleSubmit(event) {
    event.preventDefault()
    choices = []

    axios.post('/api/categories', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    //Stops the issue of trying to render a null object.  Will only try and render once something has been returned
    if (!this.state.books || !this.state.user) return <h1>Wait for info</h1>
    console.log(this.state.categories)
    // console.log(this.state.books)
    // console.log(this.state.user)
    return <main className="hero is-fullheight">

      <div className="hero-body">
        <div className="container"></div>

        <section className="section has-text-centered">
          <div className="tile is-ancestor">
            <div className="tile is-4 has-text-centered is-vertical is-parent">
              <div className="tile is-child box">
                {/* <p className="title">Profile Picture</p> */}
                <figure className="image is-128x128 has-image-centered">
                  <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                  {/* Upload picture link */}

                  <div id="file-button-center" className="file is-light is-danger">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Edit…
                        </span>
                      </span>
                    </label>
                  </div>

                </figure>

                {/* Would Like to put button here but styling needs to be adjusted */}

              </div>

              <div className="tile is-child box">
                <p className="title is-4">Username: {this.state.user.username}</p>
                <p className="title is-4">Email: {this.state.user.email}</p>
                <p className="title is-4">Password: {this.state.user.password}</p>
                <h2 className="subtitle has-text-centered is-light is-danger"><UpdateLoginDetailsModal
                  profile={this.state.user}

                /></h2>

              </div>
            </div>

            <div className="tile is-4 is-vertical is-parent">
              <div className="tile is-child box">
                <p className="title">Bio</p>
                <div className="box">
                  <p>{this.state.user.userBio}</p>
                </div>
                <h2 className="subtitle has-text-centered is-light is-danger"><UpdateBioModal
                  user={this.state.user.userBio} /></h2>
              </div>

              <div className="tile is-child box">
                <p className="title">Book Clubs</p>
                <div className="tile is-child box">
                  <p> <strong> Member of {this.state.user.bookClubs.length} Book Clubs </strong></p>

                </div>
                <Link to="/bookclubs/myBookClubs">
                  <button id="booksClubprofileButton" className="button is-light is-info">
                    Book Clubs
                  </button>
                </Link>
              </div>
            </div>

            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title">Books</p>

                <div className="tile is-child box">
                  <p> <strong> Number of Books In Library:</strong> {this.state.books.length}</p>
                  <p> <strong> Last Book Added:</strong></p>
                  <p>{this.state.books[this.state.books.length - 1].title}</p>
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books Read:</strong> {this.state.user.booksRead.length}</p>
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books Rated:</strong> {this.state.user.booksRated.length} </p>
                  {/* <p>Latest Book Rated:</p> */}
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books on Wishlist:</strong> {this.state.user.booksWishList.length} </p>
                  {/* <p>Latest Book Added:</p>
                  <p>{this.state.user.booksWishList.length}</p> */}
                </div>

                <div id="booksProfileButton" className="has-text-centered">
                  <Link to="/mylibrary">
                    <button className="button is-light is-info">
                      My Library
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>



          <div className="tile is-parent has-text-centered">

            <div className="box">
              <h1 className="title">Favourite Categories</h1>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event)}
              >

                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="advice-how-to-and-miscellaneous"
                    checked={this.state.categories.includes('advice-how-to-and-miscellaneous') ? true : false}
                  />
                          Advice and How To
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="animals"
                    checked={this.state.categories.includes('animals') ? true : false}
                  />
                          Animals
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="business-books"
                    checked={this.state.categories.includes('business-books') ? true : false}
                  />
                          Business
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="celebrities"
                    checked={this.state.categories.includes('celebrities') ? true : false}
                  />
                          Celebrities
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="paperback-books"
                    checked={this.state.categories.includes('paperback-books') ? true : false}
                  />
                          Children’s Paperback Books
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="picture-books"
                    checked={this.state.categories.includes('picture-books') ? true : false}
                  />
                          Children’s Picture Books
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="mass-market-paperback"
                    checked={this.state.categories.includes('mass-market-paperback') ? true : false}
                  />
                          Fiction
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="paperback-nonfiction"
                    checked={this.state.categories.includes('paperback-nonfiction') ? true : false}
                  />
                          Non-Fiction
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="crime-and-punishment"
                    checked={this.state.categories.includes('crime-and-punishment') ? true : false}
                  />
                          Crime and Punishment
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="culture"
                    checked={this.state.categories.includes('culture') ? true : false}
                  />
                          Culture
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="education"
                    checked={this.state.categories.includes('education') ? true : false}
                  />
                          Education
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="espionage"
                    checked={this.state.categories.includes('espionage') ? true : false}
                  />
                          Espionage
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="food-and-fitness"
                    checked={this.state.categories.includes('food-and-fitness') ? true : false}
                  />
                          Food and Diet
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="fashion-manners-and-customs"
                    checked={this.state.categories.includes('fashion-manners-and-customs') ? true : false}
                  />
                          Fashion
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="family"
                    checked={this.state.categories.includes('family') ? true : false}
                  />
                          Parenthood and Family
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="games-and-activities"
                    checked={this.state.categories.includes('games-and-activities') ? true : false}
                  />
                          Games and Activities
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="graphic-books-and-manga"
                    checked={this.state.categories.includes('graphic-books-and-manga') ? true : false}
                  />
                          Graphic Books and Manga
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="health"
                    checked={this.state.categories.includes('health') ? true : false}
                  />
                          Health
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="humor"
                    checked={this.state.categories.includes('humor') ? true : false}
                  />
                          Humour
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="relationships"
                    checked={this.state.categories.includes('relationships') ? true : false}
                  />
                          Relationships
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="hardcover-political-books"
                    checked={this.state.categories.includes('hardcover-political-books') ? true : false}
                  />
                          Politics
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="race-and-civil-rights"
                    checked={this.state.categories.includes('race-and-civil-rights') ? true : false}
                  />
                          Race and Civil Rights
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="religion-spirituality-and-faith"
                    checked={this.state.categories.includes('religion-spirituality-and-faith') ? true : false}
                  />
                          Religion, Spirituality and Faith
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="science"
                    checked={this.state.categories.includes('science') ? true : false}
                  />
                          Science
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="sports"
                    checked={this.state.categories.includes('sports') ? true : false}
                  />
                          Sport and Fitness
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="travel"
                    checked={this.state.categories.includes('travel') ? true : false}
                  />
                          Travel
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="young-adult"
                    checked={this.state.categories.includes('young-adult') ? true : false}
                  />
                          Young Adult
                </label>

                <div>
                  <button className="button is-light is-danger">
                    Submit
                  </button>
                </div>
              </form>
            </div>

          </div>
        </section>
      </div>
    </main>
  }

}

export default UserProfile