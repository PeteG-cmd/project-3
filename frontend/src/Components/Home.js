import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

import SlickCarousel from './SlickCarousel'
// import SlickCarousel2 from './SlickCarousel2'
// import SlickCarousel3 from './SlickCarousel3'

import AboutHomePageModal from './AboutHomePageModal'
import BookClubHomePageModal from './BookClubHomePageModal'
import Toastify from './Common/Toastify'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null,
      defaultCatergories: ['hardcover-fiction', 'hardcover-nonfiction', 'young-adult-hardcover']
    }
  }

  componentDidMount() {

    if (auth.isLoggedIn()) {
      console.log(auth.getToken())
      axios
        .post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => {
          this.setState({ user: res.data })

        })
    }
  
  
  }

  render() {
    const catergories = this.state.defaultCatergories
    console.log(this.state.defaultCatergories)
    

    if (!auth.isLoggedIn()) {
      return <>
        <main className="home-main">
          <section className="section" id="maintitle">
            <div className="container">
              <h1 className="title has-text-centered">Booked Up</h1>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h2 className="subtitle">Current Fiction Best Sellers</h2>
              <SlickCarousel catergories={catergories[0]} />
            </div>
          </section>
          <section className="section" id="AboutSection">
            <div className="container">
              <h2 className="subtitle has-text-centered"><AboutHomePageModal /></h2>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h2 className="subtitle">Current Non-Fiction Best Sellers</h2>
              <SlickCarousel catergories={catergories[1]} />
            </div>
          </section>
          <section className="section" id="BookClubSection">
            <div className="container">
              <h2 className="subtitle has-text-centered"><BookClubHomePageModal /></h2>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h2 className="subtitle">Current Young-Adult Best Sellers</h2>
              <SlickCarousel catergories={catergories[2]} />
            </div>
          </section>
          <footer className="section" id="mainfooter">
            <div className="container">
              <p>CopyRight By Jimbo Jambo, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    } else {
      if (!this.state.user) return <h1>Waiting</h1>
      console.log(this.state.user)

      return <>
        <main className="home-main">
          <section className="section" id="maintitle">
            <div className="container">
              <h1 className="title has-text-centered">Booked Up</h1>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <h2 className="subtitle">Selected for {this.state.user.username}...</h2>
              <SlickCarousel catergories={this.state.user.catergories} />
            </div>
          </section>

          <footer className="section" id="mainfooter">
            <div className="container">
              <p>CopyRight By Jimbo Jambo, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    }

  }

}