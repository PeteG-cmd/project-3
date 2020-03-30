import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'

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
    <p>Heloo book club</p>
    {this.state.bookClubs.map((bookClub, index) => {
      return <p key={index}>{bookClub.bookClubName}</p>
    })}

    </>
  }

}

export default MyBookClubs