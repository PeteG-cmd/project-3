import React from 'react'
import axios from 'axios'

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

  render() {
    return <section className="section">
      <h1>Hello</h1>
      <div className="tile is-ancestor">
        <div className="tile">
          {/* content */}
        </div>
      </div>
    </section>
  }

}

export default UserProfile