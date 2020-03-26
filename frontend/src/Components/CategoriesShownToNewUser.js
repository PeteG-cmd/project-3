import React from 'react'
import axios from 'axios'

class CategoriesShownToNewUser extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/addCatergories', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  // handleChange(event) {
  //   const { name, value } = event.target
  //   const data = { ...this.state.data, [name]: value }
  //   this.setState({ data })
  // }

  render() {
    const { errors } = this.state
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
                          type="checkbox" />
                          Advice and How To
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Animals
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Business
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Celebrities
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Children’s Picture Books
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Fiction
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Non-Fiction
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Crime and Punishment
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Culture
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Education
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Food and Diet
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Fashion
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Family
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Games and Activities
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Graphic Books and Manga
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Health
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Humor
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Health
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Relationships
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Politics
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Religion, Spirituality and Faith
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Science
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Sports and Fitness
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
                          Travel
                      </label>
                      <label className="checkbox">
                        <input
                          onChange={(event) => this.handleChange(event)}
                          type="checkbox" />
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


