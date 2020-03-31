import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

import BookClubComment from './BookClubComment'

import Spinner from './Common/Spinner'



class SingleBookClub extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClub: null
    }
  }

  componentDidMount() {
    const bookClubId = this.props.match.params.bookclub_id
    axios.get(`/api/bookclub/${bookClubId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ bookClub: res.data })
      })
  }

  handleRequest(memberId, event) {
    
    const bookClubId = this.props.match.params.bookclub_id

    axios.post(`/api/bookclub/${bookClubId}`, { memberId: memberId, event: event.target.value, bookClubId: this.state.bookClub._id }, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data.bookclub)
        this.setState({ bookClub: res.data.updatedbookclub })
      })

  }

  render() {
    if (!this.state.bookClub) return <Spinner />
    if (!this.state.bookClub.joinRequests) return <Spinner />
    // const bookClub = this.state.bookClub
    return <div>
      <br></br>
      <br></br>
      <br></br>

      <p>{this.state.bookClub.bookClubName}</p>
      <br></br>

      <div>
       
        <h2>Current Members:</h2>

        {this.state.bookClub.members.map((member, index) => {
          return <div key={index}>
            <p>{member.username} {member._id === this.state.bookClub.adminUser._id && <>(admin)</>}</p>

          </div>
        })}
      </div>
      <br></br>


     
      <div>
        <h2>Users awaiting approval:</h2>
        {this.state.bookClub.joinRequests.map((request, index) => {
          return <div key={index}>
            <p>{request.username}</p>
            <button value='accept' onClick={(event) => this.handleRequest(request._id, event)}>Accept</button>
            <button value='decline' onClick={(event) => this.handleRequest(request, event)}>Decline</button>
          </div>
        })}
      </div>

      <BookClubComment bookClub={this.state.bookClub} />

    </div>

   

  }

}

export default SingleBookClub