import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import Spinner from './Common/Spinner'

class CreateBookClub extends React.Component {

  constructor() {
    super()
    this.state = {
      bookClubs: null
    }
  }

  componentDidMount() {
    axios.get('/api/bookclubs', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.setState({ bookClubs: res.data }))
  }

  render() {
    if (!this.state.bookClubs) return <Spinner />
    return <>
    <br></br>
    <br></br>
    <br></br>
    {this.state.bookClubs.map((bookClub, index) => {
      return <h1 key={index}>{bookClub.bookClubName}</h1>
    })}
    </>
  }

}

export default CreateBookClub