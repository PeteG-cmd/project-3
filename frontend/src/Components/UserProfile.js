import React from 'react'
import axios from 'axios'

import auth from '../lib/auth'

class UserProfile extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    // choices = []

    axios.get('/api/categories', this.state.data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  // handleChange(event) {
  //   choices.push(event.target.value)
  //   this.setState({ data: { categories: choices } })
  //   console.log(choices)
  // }

  render() {
    return <section className="section">
      <div className="dropdown"></div>
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child box">
                {/* <!-- Put any content you want --> */}
                <h1>Content Here</h1>
                <p>Extend all along the top of the screen</p>
              </article>
              <article className="tile is-child box">
                {/* <!-- Put any content you want --> */}
                <p>Make this one a long </p>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child box">
                {/* <!-- Put any content you want --> */}
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              {/* <!-- Put any content you want --> */}
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            {/* <!-- Put any content you want --> */}
          </article>
        </div>
      </div>
    </section>
  }

}

export default UserProfile