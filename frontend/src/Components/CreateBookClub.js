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
    return <main className="hero is-fullheight" id="CreateBookClubhero">
      <div className="hero-body" id="CreateBookClubhero-body">
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <div className="columns">
                <div className="column is-one-third"></div>
                <div className="column is-block">
                  <div className="box" id="CreateBookClubbox">
                    <h1 className="title" id="CreateBookClubtitle">Create Book Club</h1>
                    <form
                      className="form"
                      onSubmit={() => this.handleSubmit(event)}
                    >
                      <div className="field">
                        <label className="label">
                          Book Club Name:
                        </label>
                        <div className="control has-icons-left">
                          <input
                            onChange={(event) => this.handleChange(event)}                            type="text"
                            name="bookClubName"
                            bookclubname={this.state.bookClub.bookClubName}
                            className="input"
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-book-reader"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">
                        Add a brief description of the Book Club:
                        </label>
                        <div className="control has-icons-left">
                          <input
                            onChange={(event) => this.handleChange(event)}
                            type="text"
                            name="descriptionBio"
                            className="input"
                            descriptionbio={this.state.bookClub.descriptionBio}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-edit"></i>
                          </span>
                        </div>
                      </div>
                      <div>
                        <button className="button is-success">Submit</button>
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

export default CreateBookClub

{/* <form onSubmit={() => this.handleSubmit(event)} >
    
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




  </form> */}