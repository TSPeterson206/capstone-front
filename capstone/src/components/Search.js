import React from 'react'

const Search = (props) => {
  return (
    <div className="search p-0 mb-3">
      <form onChange={(event) => props.handleSearchSubmit(event)} className="my-lg-0 m-auto">
        <input className="form-control mr-2 searchBar" name="search"
          onChange={(event) => props.handleChange(event)} value={props.search}
          type="search" placeholder="Search for your friends..." aria-label="Search for your friends..." />
      </form>
    </div>
  )
}

export default Search
