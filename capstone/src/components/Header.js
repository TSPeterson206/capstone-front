import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      posts: [],
      submittedSearch: false
    }
  }

  // SignInSignOutButton = () => {
  //   if (this.props.user) {
  //     localStorage.removeItem('token')
  //     this.props.setAuthentication(null)
  //   }
  // }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-info">
        Howdy!!
        </nav>
      </header>
    )
  }
}
