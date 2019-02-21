import React, { Component } from 'react'

class Search extends Component{
  constructor(props){
    super(props)

  }
  render(){
  return (
    <div className="search p-0 mb-3">
      <form onChange={(event) => this.props.handleSearchSubmit(event)} className="my-lg-0 m-auto">
        <input className="form-control mr-2 searchBar" name="search"
          onChange={(event) => this.props.handleChange(event)} value={this.props.search}
          type="search" placeholder="Search for providers" aria-label="Search for providers" />
      </form>
    </div>
  )
}
}
export default Search
