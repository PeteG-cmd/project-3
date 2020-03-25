import React from 'react'
import SlickCarousel from './SlickCarousel'

const Home = () => (
  <main className="home-main">
    <section className="section">
      <div className="container">
        <h1 className="title">Booked Up</h1>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <SlickCarousel />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>About</h2>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>SlickCara2</h2>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>TheBookclub</h2>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <h2>SlickCara3</h2>
      </div>
    </section>
  </main>
)

export default Home