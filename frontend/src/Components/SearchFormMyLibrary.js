import React from 'react'

const SearchFormMyLibrary = ({ query, onChange }) => {
  return (
    <div className="MyLibrarySearchForm">
      <form className="field has-addons" id="MyLibrarySearchFormBar">
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
export default SearchFormMyLibrary