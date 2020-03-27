import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Toastify from './Common/Toastify'

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        const token = res.data.token
        console.log(token)
        auth.setToken(token)
        this.props.history.push('/categories')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    const { error } = this.state
    return <main className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column is-one-third"></div>
                <div className="column is-block">
                  <div className="box">
                    <h1 className="title" id="logintitle">Chapter 3: Login</h1>
                    <form
                      className="form"
                      onSubmit={(event) => this.handleSubmit(event)}
                    >
                      <div className="field">
                        <label className="label">
                          Email
                        </label>
                        <div className="control has-icons-left">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="text"
                            name="email"
                            placeholder="name@gmail.com"
                            className="input"
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">
                          Password
                        </label>
                        <div className="control has-icons-left">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="password"
                            name="password"
                            className="input"
                            placeholder="*******"
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                        {error && <small className="help is-danger">
                          {error}
                        </small>}
                      </div>
                      <div>
                        <Toastify />
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

export default Login