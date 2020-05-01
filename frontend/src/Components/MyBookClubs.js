import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import { Spinner } from './Common/Spinner'
import { Link } from 'react-router-dom'
import SearchFormBookClubs from './SearchFormBookClubs'

class MyBookClubs extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClubs: null,
      filteredMyBookClubs: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get('/api/bookClubs/mybookclubs', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => this.setState({ bookClubs: res.data, filteredMyBookClubs: res.data }))
    }, 500)
  }

  handleSearch(event) {

    const searchQuery = event.target.value
    const filteredMyBookClubs = this.state.bookClubs.filter(bookClub => {
      const regex = new RegExp(searchQuery, 'i')
      return bookClub.bookClubName.match(regex) || bookClub.descriptionBio.match(regex)
    })
    this.setState({ query: searchQuery, filteredMyBookClubs: filteredMyBookClubs })
  }

  render() {
    if (!this.state.bookClubs) return <div className="AllBookClubsSpinner"><Spinner /></div>

    return <main className="SearchBookClubMain">
      <div className="SearchBookClubMainContainer">
        <div className="SearchBookClubMainHeader">
          <h2 className="AllBookClubsTitle">My Book Clubs</h2>
          <SearchFormBookClubs
            query={this.state.query}
            onChange={() => this.handleSearch(event)}
          />
        </div>
        {this.state.filteredMyBookClubs.map((bookClub, index) => {
          return <div key={index} className='bookClubJoinTab'>
            <p><span className="Allbookclubstitle">Bookclub Name:</span> {bookClub.bookClubName}</p>
            <p><span className="Allbookclubstitle">Description:</span> {bookClub.descriptionBio}</p>
            <p><span className="Allbookclubstitle">Admin:</span> {bookClub.adminUser.username}</p>
            <Link to={`/bookclub/${bookClub._id}`}><button className='button is-link is-rounded is-success'>Go To BookClub</button></Link>
            <br></br>
          </div>
        })}
      </div>
    </main>
  }

}

export default MyBookClubs