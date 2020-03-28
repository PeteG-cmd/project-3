import React from 'react'
import axios from 'axios'

import auth from '../lib/auth'

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
      user: {
        // username: '',
        // email: '',
        // password: '',
        // userBio: '',
        // categories: []
      }
    }
  }

  // componentDidMount() {
  //   axios.post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
  //     .then(() => this.props.history.push('/profile/:used_id'))
  //     .catch(err => this.setState({ errors: err.response.data.errors }))
  //   console.log(this.state.data)
  // }

  componentDidMount() {
    if (auth.isLoggedIn()) {
      axios.post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => {
          this.setState({ user: res.data })
          // console.log(res.data)
        })
    }
  }

  // To capture changes in forms
  // handleChange(event) {
  //   choices.push(event.target.value)
  //   this.setState({ data: { categories: choices } })
  //   console.log(choices)
  // }

  handleSubmit(event) {
    event.preventDefault()
    // data here
  }

  render() {
    console.log(this.state.user)
    return <main className="hero is-fullheight">

      <div className="hero-body">
        <div className="container"></div>

        <section className="section">
          <div className="tile is-ancestor">
            <div className="tile is-4 has-text-centered is-vertical is-parent">
              <div className="tile is-child box">
                <p className="title">Profile Pic</p>

                <figure className="image is-128x128">
                  <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>

              </div>
              <div className="tile is-child box">
                <p className="title">Username: {this.state.user.username}</p>
                <p className="title">Email: {this.state.user.email}</p>
                <p className="title">Password: {this.state.user.password}</p>

                <button className="button is-light is-danger">
                  Edit
            </button>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title">Bio</p>
                <p>{this.state.user.userBio}</p>
              </div>

            </div>

            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title">Books</p>


                <div className="tile is-child box">
                  <p className="title is-5">Number of Books Read:</p>
                  <p>Latest Book Read:</p>
                </div>

                <div className="tile is-child box">
                  <p className="title is-5">Number of Books Rated:</p>
                  <p>Latest Book Rated:</p>
                  {/* <p>{this.state.user.userBio}</p>  */}
                </div>

                <div className="tile is-child box">
                  <p className="title is-5">Number of Books on Wishlist:</p>
                  <p>Latest Book Added:</p>
                  {/* <p>{this.state.user.userBio}</p>  */}

                  <div>

                  </div>

                  <div className="has-text-centered">
                    <button className="button is-light is-danger">
                      My Library
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="tile is-parent has-text-centered">

            <div className="box">
              <h1 className="title">Favourite Catergories</h1>
              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event)}
              >

                <label className="checkbox">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="checkbox" value="advice-how-to-and-miscellaneous" />
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
                    type="checkbox" value="espionage" />
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