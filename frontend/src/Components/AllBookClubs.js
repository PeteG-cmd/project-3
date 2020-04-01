import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'
import { Link } from 'react-router-dom'
import SearchFormBookClubs from './SearchFormBookClubs'


class CreateBookClub extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClubs: null,
      userBookClubs: null,
      userCurrentInvitesSent: null,
      filteredBookClubs: null
    }
  }

  componentDidMount() {
    axios.get('/api/bookclubs', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => {
        console.log(res)
        this.setState({ bookClubs: res.data.bookclubs, userBookClubs: res.data.currentUser.bookClubs, userCurrentInvitesSent: res.data.currentUser.invitesSent, filteredBookClubs: res.data.bookclubs })
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

  handleSortBooks(event) {
    event.preventDefault()
    console.log(sortBookClubs)
    const sortBookClubs = this.state.bookClubs.sort((a, b) => {
      return a.bookClubName - b.bookClubName
    })
    this.setState({ bookClubs: sortBookClubs })
  }

  handleSearch(event) {

    const searchQuery = event.target.value
    const filteredBookClubs = this.state.bookClubs.filter(bookClub => {
      const regex = new RegExp(searchQuery, 'i')
      return bookClub.bookClubName.match(regex) || bookClub.descriptionBio.match(regex)
    })
    this.setState({ query: searchQuery, filteredBookClubs: filteredBookClubs })
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

    return <main className="SearchBookClubMain">
      <div className="SearchBookClubMainContainer">
        <div className="SearchBookClubMainHeader">
          <h2 className="AllBookClubsTitle">All Book Clubs</h2>
          <SearchFormBookClubs
            query={this.state.query}
            onChange={() => this.handleSearch(event)}
          />
          <button className="button is-success" onClick={() => this.handleSortBooks(event)}>Sort Book Clubs</button>
        </div>
        {this.state.filteredBookClubs.map((bookClub, index) => {
          return <div key={index} className='bookClubJoinTab'>
            <p>Bookclub Name: {bookClub.bookClubName}</p>
            <p>Description: {bookClub.descriptionBio}</p>
            <p>Admin: {bookClub.adminUser.username}</p>

            {userCurrentInvitesSent.includes(bookClub._id) ? <div className="buttons has-addons joinButton"><button className='button is-info is-loading'>Invite Pending</button><button className='button is-info'>Invite Pending</button></div> : userBookClubs.includes(bookClub._id) ? <Link to={`/bookclub/${bookClub._id}`}><button className='button is-success is-focused is-rounded'>Go to Book Club</button></Link> : <button className='button is-link is-rounded' onClick={() => this.handleSubmit(bookClub._id)}>Join</button>}
          </div>
        })}
      </div>
    </main>
  }
}


export default CreateBookClub