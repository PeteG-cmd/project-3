import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../lib/auth'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  handleLogout() {
    auth.logout()
    this.props.history.push('/')
  }

  render() {
    const isLoggedIn = auth.isLoggedIn()
    return <nav className="navbar" role="navigation" aria-label="main navigation">

      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/* <img src="frontend/assets/bookedup-logo.png" width="112" height="28" /> */}
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a role="button"
          className={`navbar-burger burger ${this.state.navMobileOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => this.setState({ navMobileOpen: !this.state.navMobileOpen })}
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${this.state.navMobileOpen ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          {!isLoggedIn && <div className="navbar-item"><Link to="/books/non_user_book_search">Search Books</Link></div>}

          {isLoggedIn && <div
            className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              My Library
            </a>
            <div className="navbar-dropdown">
              <Link to="/mylibrary" className="navbar-item">
                All books
              </Link>
              {/* <Link to="/mylibrary/wishList" className="navbar-item">
                Wish List
              </Link>
              <Link to="/mylibrary/readBooks" className="navbar-item">
                Read Books
              </Link>
              <Link to="/mylibrary/likedCategories" className="navbar-item">
                Liked Categories
              </Link>
              <Link to="/mylibrary/ratedBooks" className="navbar-item">
                Rated Books
              </Link> */}
            </div>
          </div>}

          {isLoggedIn && <div
            className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Book Clubs
            </a>
            <div className="navbar-dropdown">
              <Link to="/bookclubs/myBookClubs" className="navbar-item">
                My Book Clubs
              </Link>

              <Link to="/bookclubs/new" className="navbar-item">
                Create Book Club
              </Link>

              <Link to="/bookclubs" className="navbar-item">
                Search Book Clubs
              </Link>
            </div>
          </div>}

          {isLoggedIn && <div
            className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Search Books
            </a>

            <div className="navbar-dropdown">
              <Link to="/books/new" className="navbar-item">
                Add Books
              </Link>
            </div>
          </div>}

        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn && <div className="button is-primary"><Link to="/register"><strong>Register</strong></Link></div>}
              {!isLoggedIn && <div className="button is-light"><Link to="/login">Log in</Link></div>}
              {isLoggedIn && <div className="button is-warning"><Link to="/profile/:user_id">Profile</Link></div>}
              {isLoggedIn && <div
                onClick={() => this.handleLogout()}
                className="button is-light"
              >
                Logout
              </div>}
            </div>
          </div>
        </div>

      </div>
    </nav>
  }
}

export default withRouter(NavBar)