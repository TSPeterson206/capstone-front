import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
      <nav className="topnav navbar navbar-dark bg-secondary" id="myTopnav">
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
              <Fragment>
                <Link className="btn text-white" to={`/edit/${this.props.user.username}`}>&nbsp; Edit Profile</Link>
                <Link className="btn text-white" to="/" onClick={() => this.SignInSignOutButton()}>&nbsp; Sign Out</Link>
                </Fragment>
                :
                <Link className="btn text-white" to="/signup"> Sign up </Link>
            }
          </div>
        </div>
      </nav>
    </header>
    )
  }
}