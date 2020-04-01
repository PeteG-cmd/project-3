import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

import BookClubComment from './BookClubComment'

import Spinner from './Common/Spinner'



class SingleBookClub extends React.Component {


  constructor() {
    super()
    this.state = {
      bookClub: null,
      user: null
    }
  }


  componentDidMount() {
    const bookClubId = this.props.match.params.bookclub_id
    axios.get(`/api/bookclub/${bookClubId}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ bookClub: res.data.bookclub, user: res.data.user })
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

  handleRemoveMember(member) {

    const bookClubId = this.props.match.params.bookclub_id

    axios.post(`/api/bookclub/${bookClubId}/remove`, member, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res.data)
        this.setState({ bookClub: res.data })
      })


  }

  render() {
    if (!this.state.bookClub) return <Spinner />
    if (!this.state.bookClub.joinRequests) return <Spinner />
    const userId = this.state.user._id
    const adminId = this.state.bookClub.adminUser._id
    // const bookClub = this.state.bookClub
    return <main className="mainDetailedBookClub">
      <div className="theDetailedBookClubContainer">
        <section className="theDetailedBookClubInfoContainer" >
          <div>
            <p className='title'>{this.state.bookClub.bookClubName}</p>
            <br></br>

            <div>

              <h2 className='subtitle'>Current Members:</h2>

              {this.state.bookClub.members.map((member, index) => {
                return <div className='userInfoMemberTab' key={index}>
                  <p>{member.username} {member._id === adminId && <>(admin)</>}</p> {userId === adminId && member._id !== userId && <button className='button is-small is-danger is-rounded' onClick={() => this.handleRemoveMember(member)}>Remove</button>}

                </div>
              })}
            </div>
            <br></br>

            <div>
              <h2 className="subtitle">Users awaiting approval:</h2>
              {this.state.bookClub.joinRequests.map((request, index) => {
                return <div className='userInfoTab' key={index}>
                  <p>{request.username}</p>
                  <button className='button is-small is-rounded is-success' value='accept' onClick={(event) => this.handleRequest(request._id, event)}>Accept</button>
                  <button className='button is-small is-rounded is-danger' value='decline' onClick={(event) => this.handleRequest(request, event)}>Decline</button>
                </div>
              })}
            </div>
          </div>
        </section>
        <section className="theDetailedBookClubInfoContainer2" >
          <BookClubComment bookClub={this.state.bookClub} user={this.state.user} />
        </section>



      </div>
    </main>



  }

}

export default SingleBookClub