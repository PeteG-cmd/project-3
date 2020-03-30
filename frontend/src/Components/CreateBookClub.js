import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

class CreateBookClub extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClub: {
        bookClubName: '',
        descriptionBio: ''
      },
      errors: {}
    }
  }

  handleSubmit() {
    event.preventDefault()
    axios.post('/api/bookclubs', this.state.bookClub, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push(`/bookclub/${res.data._id}`))
      // .then(res => this.props.history.push('/bookclub/mybookclubs'))
      .catch(err => this.setState({ error: err.response.data.message }))

  }

  handleChange(event) {
    const { name, value } = event.target
    const bookClub = { ...this.state.bookClub, [name]: value }
    this.setState({ bookClub })

  }



  render() {
    return <form onSubmit={() => this.handleSubmit(event)} >
    
      <br></br>
      <br></br>
      <h1>Create a book club</h1>
      <br></br>
      <label>Book Club Name:</label>
      <input onChange={(event) => this.handleChange(event)} type='text' name='bookClubName' bookclubname={this.state.bookClub.bookClubName}>
      </input>

      <label>Add a brief description of the Book Club:</label>
      <input onChange={(event) => this.handleChange(event)} type='text' name='descriptionBio' descriptionbio={this.state.bookClub.descriptionBio}>
      </input>
      <button>Submit</button>




    </form>
  }

}

export default CreateBookClub