// Your frontend starts here..sfas
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import NavBar from './Components/Navbar'
import Home from './Components/Home'

import Register from './Components/Register'
import Login from './Components/Login'

import UserProfile from './Components/UserProfile'

import CategoriesShownToNewUser from './Components/CategoriesShownToNewUser'
import NewUserAddsCategories from './Components/NewUserAddsCategories'

import SearchNewBooks from './Components/SearchNewBooks'
import SingleBook from './Components/SingleBook'
import BooksBestSellers from './Components/BooksBestSellers'
import NonUserBookSearch from './Components/NonUserBookSearch'

import CommentsForSingleBook from './Components/CommentsForSingleBook'
import UpdateComments from './Components/UpdateComments'

import CreateBookClub from './Components/CreateBookClub'
import AllBookClubs from './Components/AllBookClubs'
import SingleBookClub from './Components/SingleBookClub'
import MyBookClubs from './Components/MyBookClubs'
import JoinMyBookClub from './Components/JoinMyBookClub'
import CommentsOnTheBookClub from './Components/CommentsOnTheBookClub'

const App = () => (
  
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/categories" component={CategoriesShownToNewUser} />
      <Route path="/categories/:user_id" component={NewUserAddsCategories} />
      <Route exact path="/profile/:user_id" component={UserProfile} />
      <Route exact path="/books/new" component={SearchNewBooks} />
      <Route exact path="/books/bestsellers" component={BooksBestSellers} />
      <Route exact path="/books/nonuserbooksearch" component={NonUserBookSearch} />
      <Route path="/book/:googleId" component={SingleBook} />
      <Route path="/book/:book_id/comments" component={CommentsForSingleBook} />
      <Route path="/book/:book_id/comment/:comment_id" component={UpdateComments} />
      <Route path="/bookclub/create" component={CreateBookClub} />
      <Route exact path="/bookclubs" component={AllBookClubs} />
      <Route exact path="/bookclub" component={SingleBookClub} />
      <Route path="/bookclubs/myBookClubs" component={MyBookClubs} />
      <Route path="/bookclubs/myBookClubs/:bookclub_id" component={JoinMyBookClub} />
      <Route path="/bookclubs/myBookClubs/:bookclub_id/comments" component={CommentsOnTheBookClub} />
    </Switch>
  </BrowserRouter>
  
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)