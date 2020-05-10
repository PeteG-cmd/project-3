// Your frontend starts here..sfas
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import NavBar from './Components/NavBar'
import Home from './Components/Home'

import Register from './Components/Register'
import Login from './Components/Login'

import UserProfile from './Components/UserProfile'

import CategoriesShownToNewUser from './Components/CategoriesShownToNewUser'

import SearchNewBooks from './Components/SearchNewBooks'
import SingleBook from './Components/SingleBook'
import DetailedBookPage from './Components/DetailedBookPage'

import BookComment from './Components/BookComment'

import CreateBookClub from './Components/CreateBookClub'
import AllBookClubs from './Components/AllBookClubs'
import SingleBookClub from './Components/SingleBookClub'
import MyBookClubs from './Components/MyBookClubs'


import UserLibrary from './Components/UserLibrary'

const App = () => (

  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/categories" component={CategoriesShownToNewUser} />
      <Route exact path="/profile/:user_id" component={UserProfile} />
      <Route path="/books/new/:title" component={SearchNewBooks} />
      <Route exact path="/books/new" component={SearchNewBooks} />
      <Route exact path="/books/:book_id" component={DetailedBookPage} />
      <Route exact path="/book/:webId" component={SingleBook} />
      <Route exact path="/books/:book_id/comments" component={BookComment} />
      <Route exact path="/bookclubs" component={AllBookClubs} />
      <Route exact path="/bookclubs/new" component={CreateBookClub} />
      <Route exact path="/bookclub/:bookclub_id" component={SingleBookClub} />
      <Route path="/bookclubs/myBookClubs" component={MyBookClubs} />
      <Route exact path="/mylibrary" component={UserLibrary} />

    </Switch>
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)