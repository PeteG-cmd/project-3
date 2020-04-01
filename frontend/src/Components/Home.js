import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'

import SlickCarousel from './SlickCarousel'
// import SlickCarousel2 from './SlickCarousel2'
// import SlickCarousel3 from './SlickCarousel3'


import Toastify from './Common/Toastify'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null,
      defaultCategories: ['hardcover-fiction', 'hardcover-nonfiction', 'young-adult-hardcover'],
      books: []
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

      axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => this.setState({ books: res.data }))
        .catch(err => this.setState({ error: err.response.data.message }))
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
                <div className="AboutHomePageInfoContent">
                  <div className="Contents1">
                    <h2 className="Contents1Heading">Contents:</h2>
                    <div className="ContentsList1">
                      <ul className="Book1List">
                        <li><strong>1:</strong> About Booked Up</li>
                        <li><strong>2:</strong> The Book Club</li>
                        <li><strong>3:</strong> Register</li>
                        <li><strong>4:</strong> Login</li>
                        <li><strong>5:</strong> Categories</li>
                      </ul>
                    </div>
                  </div>
                  <div className="AboutTitleandInfo">
                    <div className="Chapter1Title">
                      <h2 className="Chapter1TitleHeading">Chapter 1</h2>
                      <h4 className="Chapter1TitleInfo">About Booked Up</h4>
                    </div>
                    <div className="Chapter1Contents">
                      <p className="Chapter1Info">Search through 1000s of books and create a Library with your Favourite Books. Give them a rating and comment, and talk about them in your Book Clubs. <strong>Get Booked Up!</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="BookClubHomePageInfoContainer">
                <div className="BookClubHomePageInfoContent">
                  <div className="Contents2">
                    <h2 className="Contents2Heading">Contents:</h2>
                    <div className="ContentsList2">
                      <ul className="Book2List">
                        <li><strong>1:</strong> About Booked Up</li>
                        <li><strong>2:</strong> The Book Club</li>
                        <li><strong>3:</strong> Register</li>
                        <li><strong>4:</strong> Login</li>
                        <li><strong>5:</strong> Categories</li>
                      </ul>
                    </div>
                  </div>
                  <div className="BookClubTitleandInfo">
                    <div className="Chapter2Title">
                      <h2 className="Chapter2TitleHeading">Chapter 2</h2>
                      <h4 className="Chapter2TitleInfo">The Book Club</h4>
                    </div>
                    <div className="Chapter2Contents">
                      <p className="Chapter2Info">Create or Join a Book Club and invite fellow readers to talk about the latest book you are reading.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="NonUserHomePageCarouselContainer">
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle1">
                  <h2 className="CarouselTitleContent">Current Fiction Best Sellers</h2>
                </div>
                <div className="NonUserCarouselImagesContainer">
                  <div className="CarouselImages">
                    <SlickCarousel categories={categories[0]} />
                  </div>
                </div>
              </div>
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle1">
                  <h2 className="CarouselTitleContent">Current Non-Fiction Best Sellers</h2>
                </div>
                <div className="NonUserCarouselImagesContainer">
                  <div className="CarouselImages">
                    <SlickCarousel categories={categories[1]} />
                  </div>
                </div>
              </div>
              <div className="NonUserHomePageCarouselContent">
                <div className="CarouselTitle1">
                  <h2 className="CarouselTitleContent">Current Young-Adult Best Sellers</h2>
                </div>
                <div className="NonUserCarouselImagesContainer" id="SlickCarousel3">
                  <div className="CarouselImages">
                    <SlickCarousel categories={categories[2]} />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <footer id="NonUserHomeMainfooter">
            <div>
              <p>CopyRight By Maxwell Jam, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    } else {
      if (!this.state.user) return <h1>Waiting</h1>
      console.log(this.state.user)

      return <>
        <main className="user-home-main">
          <div className="UserMainHomeContainer">
            <section className="LatestBooksContainer">
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to My Library</h2>
                <div className="LatestBookCard">
                  <div className="LatestBookCardImageContainer">
                    <figure className="LatestBookCardFigure">
                      <img src="" alt="" className="LatestBookCardContent"></img>
                    </figure>
                    <div className="SearchBookImageContainerInfo">
                      <h5 className="SearchBookImageContainerInfoContent"><strong>Page Count:</strong></h5>
                      <h5 className="SearchBookImageContainerInfoContent"><strong>Language:</strong></h5>
                      <h5 className="SearchBookImageContainerInfoContent"><strong>Category:</strong></h5>
                    </div>
                  </div>
                  <div className="SearchTitleandAuthorInfo">
                    <h4 className="SearchTheTitle">Hi</h4>
                    <h5 className="SearchAuthor">Bye</h5>
                  </div>
                </div>
              </div>
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to Books Read</h2>
                <div className="LatestBookCard">

                </div>
              </div>
            </section>
            <section className="mainHomeCarousel">
              <div className="mainHomeCarouselContainer">
                <div className="CarouselTitle2">
                  <h2 className="CarouselTitleContent">Selected for {this.state.user.username} from Favourite Categories...</h2>
                </div>
                <div className="CarouselSubContainer">
                  <div className="UserCarouselAllImages">
                    <SlickCarousel categories={this.state.user.categories} />
                  </div>
                </div>
              </div>
            </section>
            <section className="LatestBooksContainer">
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to Wish List</h2>
                <div className="LatestBookCard">

                </div>
              </div>
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to Books Rated</h2>
                <div className="LatestBookCard">

                </div>
              </div>
            </section>
          </div>
          <footer id="UserHomeMainfooter">
            <div>
              <p>CopyRight By Maxwell Jam, Peter Pan, Gordon Ramsay</p>
            </div>
          </footer>
        </main>
      </>

    }

  }

}