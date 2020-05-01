import React from 'react'
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
        passwordConfirmation: '',
        avatar: ''
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

  uploadImage(image) {
    console.log(image)

    let imageFormObj = new FormData()

    imageFormObj.append("imageName", "multer-image-" + Date.now())
    imageFormObj.append("imageData", image.target.files[0])
    console.log(image.target.files[0])

    // stores a readable instance of 
    // the image being uploaded using multer
    this.setState({
      avatar: URL.createObjectURL(image.target.files[0])
    })

    axios.post('api/uploadmulter', imageFormObj, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using multer")

        }
      })
      .catch((err) => {
        alert("Error while uploading image using multer")
      })
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
                    <h1 className="title">Chapter 1: Register</h1>
                    <RegisterForm
                      handleSubmit={(event) => this.handleSubmit(event)}
                      handleChange={(event) => this.handleChange(event)}
                      uploadImage={(image) => this.uploadImage(image)}
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