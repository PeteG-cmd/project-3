import React from 'react'
import axios from 'axios'

import auth from '../lib/auth'

let choices = []

class CategoriesShownToNewUser extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {},
      errors: {}
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    choices = []

    axios.post('/api/categories', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(event) {
    choices.push(event.target.value)
    this.setState({ data: { categories: choices } })
    console.log(choices)
  }

  render() {
    return <main className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column"></div>
                <div className="column is-two-thirds">
                  <div className="box">
                    <h1 className="title">Chapter 2:</h1>
                    <h2 className="subtitle"><strong>Select Your Favourite Book Categories</strong></h2>
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
                        <button className="button is-success">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="column"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  }

}

export default CategoriesShownToNewUser


