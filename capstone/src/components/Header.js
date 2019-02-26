import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import { FaShoePrints } from 'react-icons/fa'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  SignInSignOutButton = () => {
    if (this.props.user) {
      localStorage.removeItem('token')
      this.props.setAuthentication(null)
    }
  }

render() {
  return (
    <header>
      <nav className="topnav navbar" id="myTopnav">
        <div className="container mr-auto">
          <div className="header-title"><a className="header-title" href={!this.props.user ? `/` : `/profile/${this.props.user.username}`}><FaShoePrints className="fa-2x"/> <strong>NextSteps</strong></a></div>
          <div className="navbar-right">
            {
              this.props.user ?
              <span className="ml-2 username"> Hi {this.props.user.username}! </span>
              :
              <Link className="btn ml-2" to="/">Sign In </Link>
            }
            {
              this.props.user ?
              <Fragment>
                <Link className="btn" to={`/edit/${this.props.user.username}`}>&nbsp; Edit Profile</Link>
                <Link className="btn" to="/" onClick={() => this.SignInSignOutButton()}>&nbsp; Sign Out</Link>
                </Fragment>
                :
                <Link className="btn" to="/signup"> Sign up </Link>
            }
          </div>
        </div>
      </nav>
    </header>
    )
  }
}