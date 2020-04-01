import React from 'react'

const SearchFormBookClubs = ({ query, onChange }) => {
  return (
    <div className="AllBookClubsSearchForm">
      <form className="field has-addons" id="AllBookClubsSearchFormBar">
        <div className="control is-expanded">
          <input
            className="input is-normal"
            type="search"
            placeholder="search book..."
            value={query}
            onChange={onChange}
          />
        </div>
      </form>
    </div>
  )
}
export default SearchFormBookClubs