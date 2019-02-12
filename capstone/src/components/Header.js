import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import '../index.css'

import Search from './Search'

import axios from 'axios'

import SearchedProviders from './SearchedProviders'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      posts: [],
      submittedSearch: false,
      id: '',
      searchedProviders:[],
      urlparams: '',
      loggedin: '',
      isLoading: true,
      data:[],
      loggedinId: ''
    }
  }

  SignInSignOutButton = () => {
    if (this.props.user) {
      localStorage.removeItem('token')
      this.props.setAuthentication(null)
    }
  }

  // SEARCH AND SUBMIT FUNCTIONS

  handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.get(`http://localhost:8000/providers`)
      const data = await response.data.filter(post =>
        Object.values(post).reduce((i, b) => i || (typeof b === 'string' ?
          b.toLowerCase().includes(this.state.search.toLowerCase()) : false), false)
      )
      console.log(data)

      this.setState({
        searchedProviders: data,
        submittedSearch: true
      })

      if(this.state.search.length <2) {
        this.setState({
          submittedSearch:false
        })
      }
      console.log(this.state.submittedSearch)

      return data
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container mr-auto">
            <a className="navbar-brand" href={!this.props.user ? `/` : `/profile/${this.props.user.username}`}>Capstone!</a>
            <div className="navbar-right">

              {
                this.props.user ?
                <span className="ml-2 text-white username"> Hi {this.props.user.username}! </span>
                :
                <Link className="btn text-white ml-2" to="/">Sign In </Link>
              }

              {
                this.props.user ?
                  <span>
                    &nbsp;<Link className="btn text-white" to={`/edit/${this.props.user.username}`}>&nbsp; Edit Profile</Link>
                    <Link className="btn text-white" to="/" onClick={() => this.SignInSignOutButton()}>&nbsp; Sign Out</Link>
                  </span>
                  :
                  <Link className="btn text-white" to="/signup"> Sign up </Link>
              }

            </div>
            <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange} />
            {
            this.state.submittedSearch && this.state.searchedProviders.map(post =>
              <SearchedProviders
                businessphoto={post.businessphoto}
                companyname={post.companyname}
                address={post.address}
                phone={post.phone}
                />)
          }

          </div>
        </nav>
      </header>
    )
  }
}
