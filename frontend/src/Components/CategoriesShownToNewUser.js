import React from 'react'

class CategoriesShownToNewUser extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return <section>
      <main className="hero is-fullheight">
        {/* <div className="hero-body"> */}
        <div className="container">
          <section className="section">
            <div className="container has-text-centered">
              <h1 className="title">Select Your Favourite Book Categories</h1>
              <h2 className="subtitle"></h2>
              <label className="checkbox">
                <input type="checkbox" />
          Advice and How To
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" />
          Fiction
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" />
          Non Fiction
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" />
          Mass Market Fiction
              </label>
              <br />
              <label className="checkbox">
                <input type="checkbox" />
          Trade Fiction
              </label>
            </div>
          </section>
        </div>
        {/* </div> */}
      </main>
    </section>
  }

}

export default CategoriesShownToNewUser


