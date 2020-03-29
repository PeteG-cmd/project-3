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
    return <>
    <br></br>
    <br></br>
    <br></br>
    <h1>A list of all your book clubs</h1>

    </>
  }

}

export default MyBookClubs