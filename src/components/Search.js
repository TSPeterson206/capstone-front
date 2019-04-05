import React, { Component } from 'react'

class Search extends Component {
  render () {
    return (
      <div className='search p-0 mb-3'>
        <form onChange={(event) => this.props.handleSearchSubmit(event)} className='searchForm my-lg-0 m-auto'>
          <input className='searchBar' name='search'
            onChange={(event) => this.props.handleChange(event)} value={this.props.search}
            type='search' placeholder='&nbsp; &#61442;' />
        </form>
      </div>
    )
  }
}
export default Search
