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
                          type="checkbox" value="Advice" />
                          Advice and How To
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Animals" />
                          Animals
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Business" />
                          Business
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Celebrities" />
                          Celebrities
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Children" />
                          Children’s Picture Books
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Fiction" />
                          Fiction
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Non-Fiction" />
                          Non-Fiction
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Crime" />
                          Crime and Punishment
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Culture" />
                          Culture
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Education" />
                          Education
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Food" />
                          Food and Diet
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Fashion" />
                          Fashion
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Family" />
                          Family
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Games" />
                          Games and Activities
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Manga" />
                          Graphic Books and Manga
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Health" />
                          Health
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Humor" />
                          Humor
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Relationships" />
                          Relationships
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Politics" />
                          Politics
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Religion" />
                          Religion, Spirituality and Faith
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Science" />
                          Science
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Sport" />
                          Sport and Fitness
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Travel" />
                          Travel
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" value="Young-adult" />
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


