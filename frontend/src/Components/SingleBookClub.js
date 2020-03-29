import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
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
      .then(res => this.setState({ bookClub: res.data }))
  }


  render() {
    if (!this.state.bookClub) return <Spinner />
    return <>
    <br></br>
    <br></br>
    <br></br>
    HELOOOOOOO
    <p>{this.state.bookClub.bookClubName}</p>

    </>
  }

}

export default SingleBookClub