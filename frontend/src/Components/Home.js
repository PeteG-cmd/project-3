import React from 'react'
import SlickCarousel from './SlickCarousel'

const Home = () => (
  <section className="hero is-fullheight is-dark">
    <div className="hero-body">
      <div className="container">
        {/* <h1>The Best Books</h1> */}
        <SlickCarousel />
      </div>
    </div>
  </section>
)

export default Home