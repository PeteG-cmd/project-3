import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'

class CreateBookClub extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClubs: null,
      userBookClubs: null,
      userCurrentInvitesSent: null
    }
  }

  componentDidMount() {
    axios.get('/api/bookclubs', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res)
        this.setState({ bookClubs: res.data.bookclubs, userBookClubs: res.data.currentUser.bookClubs, userCurrentInvitesSent: res.data.currentUser.invitesSent })
      })
    // .then(res => this.bookClubStatus())
  }

  handleSubmit(bookClubId) {
    console.log(bookClubId)
    axios.post('/api/bookclub/requestjoin', { _id: bookClubId }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        this.setState({ userBookClubs: res.data.user.bookClubs, userCurrentInvitesSent: res.data.user.invitesSent })
      })
      
    // .then(res => this.bookClubStatus())
  }

  // bookClubStatus() {
  //   console.log(this.state)
  //   let status = null
  //   const bookClubs = this.state.bookClubs.map(bookclub => {
  //     if (bookclub.members.includes(this.state.userId)) {
  //       status = 'member'
  //     } else if (bookclub.joinRequests.includes(this.state.userId)) {
  //       status = 'pending'
  //     } else {
  //       status = 'available'
  //     }
  //     bookclub.status = status
  //     console.log(bookclub)
  //     return bookclub

  //   })

  //   this.setState({ bookClubs })

  // }



  render() {

    if (!this.state.bookClubs) return <Spinner />

    const userCurrentInvitesSent = this.state.userCurrentInvitesSent
    const userBookClubs = this.state.userBookClubs
    // const bookClubs = this.state.bookClubs

    return <>
      <br></br>
      <br></br>
      <br></br>

      <h1>All Book Clubs</h1>

      {this.state.bookClubs.map((bookClub, index) => {
        return <div key={index} >
          <p>Bookclub Name: {bookClub.bookClubName}</p>
          <p>Description: {bookClub.descriptionBio}</p>
          <p>Admin: {bookClub.adminUser.username}</p>

          {userCurrentInvitesSent.includes(bookClub._id) ? <button>Invite Pending</button> : userBookClubs.includes(bookClub._id) ? <button>Already a member of this book club</button> : <button onClick={() => this.handleSubmit(bookClub._id)}>Join</button>}

          <br></br>
          <br></br>
        </div>
      })}
    </>
  }
}


export default CreateBookClub