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
      defaultCategories: ['hardcover-fiction', 'hardcover-nonfiction', 'young-adult-hardcover']
    }
  }

  componentDidMount() {

    if (auth.isLoggedIn()) {
      axios
        .post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => {
          this.setState({ user: res.data })
          console.log(res.data)
        })
    }
  }

  render() {
    const categories = this.state.defaultCategories
    console.log(this.state.defaultCategories)


    if (!auth.isLoggedIn()) {
      return <>
        <main className="non-user-home-main">
          <div className="HomePageContainer">
            <section className="HomePageInfoContainer">
              <div className="AboutHomePageInfoContainer">

              </div>
              <div className="BookClubHomePageInfoContainer">

              </div>
            </section>
            <section className="NonUserHomePageCarouselContainer">
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle">
                  <h2>Current Fiction Best Sellers</h2>
                </div>
                <div className="CarouselImages">
                  <SlickCarousel categories={categories[0]} />
                </div>
              </div>
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle">
                  <h2>Current Non-Fiction Best Sellers</h2>
                </div>
                <div>
                  <SlickCarousel categories={categories[1]} />
                </div>
              </div>
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle">
                  <h2>Current Young-Adult Best Sellers</h2>
                </div>
                <div>
                  <SlickCarousel categories={categories[2]} />
                </div>
              </div>
            </section>
          </div>
          <footer id="NonUserHomeMainfooter">
            <div>
              <p>CopyRight By Jimbo Jambo, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    } else {
      if (!this.state.user) return <h1>Waiting</h1>
      console.log(this.state.user)

      return <>
        <main className="user-home-main">
          {/* <section className="section" id="maintitle">
            <div className="container">
              <h1 className="title has-text-centered">Booked Up</h1>
            </div>
          </section> */}

          <section className="mainHomeCarousel">
            <div className="mainHomeCarouselContainer">
              <div className="CarouselTitle">
                <h2 className="CarouselTitleContent">Selected for {this.state.user.username} from Favourite Categories...</h2>
              </div>
              <div className="CarouselSubContainer">
                <SlickCarousel categories={this.state.user.categories} />
              </div>
            </div>
          </section>

          <footer className="section" id="UserHomeMainfooter">
            <div className="container">
              <p>CopyRight By Jimbo Jambo, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    }

  }

}