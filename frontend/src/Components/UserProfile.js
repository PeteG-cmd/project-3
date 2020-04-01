import React from 'react'
import axios from 'axios'

import auth from '../lib/auth'
import { Link } from 'react-router-dom'

import UpdateLoginDetailsModal from './UpdateLoginDetailsModal'
import UpdateBioModal from './UpdateBioModal'

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      user: {
        profile: {}
      },
      books: null
    }
  }

  componentDidMount() {
    axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ books: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }))

    axios.post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        this.setState({ user: res.data })
      })
  }


  // checkCat(value) {
  //   const check = this.state.profile.categories.some(category => {
  //     console.log(this.state.user)
  //     return category.category === value
  //   })
  //   return check
  // }

  render() {
    //Stops the issue of trying to render a null object.  Will only try and render once something has been returned
    if (!this.state.books) return <h1>Wait for books</h1>
    console.log(this.state.books)
    console.log(this.state.user)
    // console.log(this.state.user.booksWishList.length)
    // console.log(this.state.user.booksRead)
    // console.log(this.state.user.bookClubs.length)
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
                  <div className="file is-light is-danger">
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
                  <p> <strong> Member of {} Book Clubs </strong></p>
                  {/* {this.state.user.bookClubs.length} */}

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
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books Read:</strong> </p>
                  {/* {this.state.user.booksRead} */}
                  <p> <strong> Last Book Read:</strong></p>
                  <p>{this.state.books[this.state.books.length - 1].title}</p>
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books Rated:</strong> {} </p>
                  {/* <p>{this.state.user.booksRated.length}</p> */}
                  <p>Latest Book Rated:</p>
                </div>

                <div className="tile is-child box">
                  <p> <strong> Number of Books on Wishlist:</strong> {} </p>
                  <p>Latest Book Added:</p>
                  {/* <p>{this.state.user.booksWishList.length}</p>  */}
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
                  // check={this.checkCat(event.target.value)}
                  />
                          Advice and How To
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="animals" />
                          Animals
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="business-books" />
                          Business
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="celebrities" />
                          Celebrities
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="paperback-books" />
                          Children’s Paperback Books
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="picture-books" />
                          Children’s Picture Books
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="mass-market-paperback" />
                          Fiction
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="paperback-nonfiction" />
                          Non-Fiction
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="crime-and-punishment" />
                          Crime and Punishment
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="culture" />
                          Culture
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="education" />
                          Education
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox"
                    value="espionage"
                    checked={this.state.user.catergories === 'espionage' ? true : false} />
                          Espionage
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="food-and-fitness" />
                          Food and Diet
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="fashion-manners-and-customs" />
                          Fashion
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="family" />
                          Parenthood and Family
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="games-and-activities" />
                          Games and Activities
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="graphic-books-and-manga" />
                          Graphic Books and Manga
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="health" />
                          Health
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="humor" />
                          Humour
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="relationships" />
                          Relationships
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="hardcover-political-books" />
                          Politics
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="race-and-civil-rights" />
                          Race and Civil Rights
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="religion-spirituality-and-faith" />
                          Religion, Spirituality and Faith
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="science" />
                          Science
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="sports" />
                          Sport and Fitness
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="travel" />
                          Travel
                </label>
                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="young-adult" />
                          Young Adult
                </label>

                <div>
                  <button className="button is-light is-danger">
                    Edit
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