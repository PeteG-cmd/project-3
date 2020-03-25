import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      errors: {}
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register',
      this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return <main className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column is-one-third"></div>
                <div className="column is-block">
                  <div className="box">
                    <h1 className="title">Chapter 1: Register</h1>
                    <form
                      className="form"
                      onSubmit={(event) => this.handleSubmit(event)}
                    >
                      <div className="field">
                        <label className="label">
                          Email
                        </label>
                        <div className="control">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="text"
                            name="email"
                            className="input"
                          />
                        </div>
                        {errors.email && <small className="help is-danger">
                          {errors.email}
                        </small>}
                      </div>
                      <div className="field">
                        <label className="label">
                          Username
                        </label>
                        <div className="control">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="text"
                            name="username"
                            className="input"
                          />
                        </div>
                        {errors.username && <small className="help is-danger">
                          {errors.username}
                        </small>}
                      </div>
                      <div className="field">
                        <label className="label">
                          Password
                        </label>
                        <div className="control">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="password"
                            name="password"
                            className="input"
                          />
                        </div>
                        {errors.password && <small className="help is-danger">
                          {errors.password}
                        </small>}
                      </div>
                      <div className="field">
                        <label className="label">
                          Confirm Password
                        </label>
                        <div className="control">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="password"
                            name="passwordConfirmation"
                            className="input"
                          />
                        </div>
                        {errors.passwordConfirmation && <small className="help is-danger">
                          {errors.passwordConfirmation}
                        </small>}
                      </div>
                      <button className="button is-success">
                        <Link to="/categories" className="linkregistertocategories">Register</Link>
                      </button>
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

export default Register