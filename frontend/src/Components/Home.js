import React from 'react'

import SlickCarousel from './SlickCarousel'
import SlickCarousel2 from './SlickCarousel2'
import SlickCarousel3 from './SlickCarousel3'

import AboutHomePageModal from './AboutHomePageModal'
import BookClubHomePageModal from './BookClubHomePageModal'

const Home = () => (
  <main className="home-main">
    <section className="section" id="maintitle">
      <div className="container">
        <h1 className="title has-text-centered">Booked Up</h1>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2 className="subtitle">Current Fiction Best Sellers</h2>
        <SlickCarousel />
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
        <SlickCarousel2 />
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
        <SlickCarousel3 />
      </div>
    </section>
    <footer className="section" id="mainfooter">
      <div className="container">
        <p>CopyRight By Jimbo Jambo, Peter Pan, Gordon Ramsay</p>
      </div>
    </footer>
  </main>
 
)

export default Home