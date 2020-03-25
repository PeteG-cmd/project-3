import React from 'React'
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
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/books/new">Search Books</Link>
          {isLoggedIn && <div className="navbar-item"><Link to="/bookclubs">Book Clubs</Link></div>}
          {isLoggedIn && <div className="navbar-item"><Link to="/bookclubs/myBookClubs"> My Book Clubs</Link></div>}
          {isLoggedIn && <div className="navbar-item"><Link to="/profile/:user_id">Profile</Link></div>}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isLoggedIn && <div className="button is-primary"><Link to="/register"><strong>Register</strong></Link></div>}
              {!isLoggedIn && <div className="button is-light"><Link to="/login">Log in</Link></div>}
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