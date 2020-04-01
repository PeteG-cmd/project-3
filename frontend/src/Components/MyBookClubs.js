import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'
import { Link } from 'react-router-dom'

class MyBookClubs extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClubs: null
    }
  }

  componentDidMount() {
    axios.get('/api/bookClubs/mybookclubs', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ bookClubs: res.data }))
  }



  render() {
    if (!this.state.bookClubs) return <Spinner />
    
    return <>
      <br></br>
      <br></br>
      <br></br>
      <p>My Book Clubs</p>
      <br></br>
      {this.state.bookClubs.map((bookClub, index) => {
        return <div key={index} className='bookClubJoinTab'>
          <p>Bookclub Name: {bookClub.bookClubName}</p>
          <p>Description: {bookClub.descriptionBio}</p>
          <p>Admin: {bookClub.adminUser.username}</p>
          <Link to={`/bookclub/${bookClub._id}`}><button className='button is-link is-outlined is-rounded'>Go To BookClub</button></Link>
          <br></br>
        </div>

      })}

    </>
  }

}

export default MyBookClubs