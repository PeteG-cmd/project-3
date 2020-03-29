import React from 'react'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'


class DetailedBookPage extends React.Component {

  constructor() {
    super()
    this.state = {
      book: null
    }
  }

  componentDidMount() {
    const webId = this.props.match.params.webId
    console.log(this.props)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=id:${webId}&key=AIzaSyCEn7nVijyWlVGp995NH9PBDmTdmECg3DY`)
      .then(res => {
        console.log(res.data.items)
        this.setState({ book: res.data.items })
      })

      .catch(error => console.error(error))
  }
  render() {
    if (!this.state.book) return <h1>WAITING FOR BOOKS</h1>

    const book = this.state.book
    return <main className="mainDetailedBook">
      <div className="theDetailedBookcontainer">
        <section className="theDetailedBookInfocontainer">
          <figure id="DBPFigImg">
            {/* This line below is a one line ternary only rendering if the picture exists. */}
            {book[0].volumeInfo.imageLinks && <img src={book[0].volumeInfo.imageLinks.thumbnail} id="DetailedBookPageImg"></img>}
          </figure>
          <div className="theDetailedBookInfo">
            <h1 id="DetailedBookTitle">{book[0].volumeInfo.title}</h1>
            <div className="theDetailedBookStats">
              <div className="stats" id="generalStats">
                <ul className="generalStatsList">
                  {book[0].volumeInfo.authors && <li className="generalStatsListItem"><span className="statsListTitle">Author:</span> {book[0].volumeInfo.authors[0]}</li>}
                  {book[0].volumeInfo.publisher && <li className="generalStatsListItem"><span className="statsListTitle">Publisher:</span>  {book[0].volumeInfo.publisher}</li>}
                  {book[0].volumeInfo.publishedDate && <li className="generalStatsListItem"><span className="statsListTitle">Published Date:</span>  {book[0].volumeInfo.publishedDate}</li>}
                </ul>
              </div>
              <div className="stats" >
                <div id="descriptionModal">
                  <DescriptionModal
                    title={book[0].volumeInfo.title}
                    description={book[0].volumeInfo.description}
                  />
                </div>
                <p className="to-top">Description Above</p>
              </div>
              <div className="stats" id="ratings">
                <ul className="generalRatingsList">
                  {book[0].volumeInfo.averageRating && <li className="generalRatingsListItem"><span className="ratingsListTitle">Average Rating:</span> {book[0].volumeInfo.averageRating}</li>}
                  {book[0].volumeInfo.ratingsCount && <li className="generalRatingsListItem"><span className="ratingsListTitle">Ratings Count:</span>  {book[0].volumeInfo.ratingsCount}</li>}
                  {book[0].volumeInfo.language && <li className="generalRatingsListItem"><span className="ratingsListTitle">Book Language:</span>  {book[0].volumeInfo.language}</li>}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="theCommentsInfocontainer">
          <div id="userRatingandComments">
            <div className="userRating">
              <h3><strong>User Average Rating:</strong> ⭐️⭐️⭐️⭐️</h3>
            </div>
            <div className="Comments">
              <h3 id="Commenttitle"><strong>User Comments</strong></h3>
              <div className="showComments">
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src="https://bulma.io/images/placeholders/128x128.png"></img>
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                      </p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                      
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-reply"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fas fa-heart"></i></span>
                        </a>
                      </div>
                    </nav>
                  </div>
                  <div className="media-right">
                    <button className="delete"></button>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div>
            <h1>Hello</h1>
          </div>
          <div>
            <h1>Hello</h1>
          </div>
        </section>
      </div>
    </main>

  }
}


export default DetailedBookPage