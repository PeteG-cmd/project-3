import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import auth from '../lib/auth'

import RegisterForm from './RegisterForm'

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
    axios.post('/api/register', this.state.data)
      .then(res => {
        const token = res.data.token
        console.log(token)
        auth.setToken(token)
        this.props.history.push('/categories')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return <main className="hero is-fullheight" id="registerhero">
      <div className="hero-body" id="registerhero-body">
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column is-one-third"></div>
                <div className="column is-block">
                  <div className="box" id="registerbox">
                    <h1 className="title">Chapter 3: Register</h1>
                    <RegisterForm
                      handleSubmit={(event) => this.handleSubmit(event)}
                      handleChange={(event) => this.handleChange(event)}
                      errors={errors}
                      data={this.state.data}
                    />
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