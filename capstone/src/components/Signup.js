import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from '../utils/request'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showErrorMessage: false
    }
  }

  handleSignUp = event => {
    event.preventDefault()
    const { username, password, tagline, profilepic, soberdate } = event.target

    request('/users', 'post', {
      username: username.value,
      password: password.value,
      tagline:tagline.value,
      profilepic:profilepic.value,
      soberdate:soberdate.value
    })
      .then(response => {
        this.setState({ showErrorMessage: false })
        localStorage.setItem('token', response.data.token)
        return request('/auth/login')
      })
      .then(response => {
        this.props.setAuthentication(response.data)
        this.props.history.push({pathname:`/customize/${username.value}`, state: {id:username.value}})
      })
      .catch(error => {
        console.log(error)
        this.setState({ showErrorMessage: true })
        window.setTimeout(() => {
          this.setState({
            showErrorMessage: false
          });
        }, 2000);
      })
  }

  render() {
    return (
      <div className="col-sm-6 mt-5 mr-auto ml-auto">
        <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
          Username not available!
        </div>
        <form className="border rounded p-5 box" onSubmit={this.handleSignUp}>
          <h1>Client Sign Up</h1>
          <div className="form-group">
            {/* <label htmlFor="username">Username</label> */}
            <input type="text" className="form-control" id="username" name="username" aria-describedby="usernameHelp" placeholder="enter username" required />
            {/* <small id="usernameHelp" className="form-text text-muted">Usernames must be unique!</small> */}
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input type="password" className="form-control" id="password" name="password" placeholder="password" required />
          </div>
          <div className="form-group">
            {/* <label htmlFor="displayname">Bio</label> */}
            <input type="text" className="form-control" id="tagline" name="tagline" placeholder="enter your motto" required />
          </div>
          <div className="form-group">
            {/* <label htmlFor="displayname">Profile Picture</label> */}
            <input type="text" className="form-control" id="profilepic" name="profilepic" placeholder="link a picture of yourself" required />
          </div>
          <div className="form-group">
            <label htmlFor="soberdate">Sobriety Date</label>
            <input type="date" className="form-control" id="soberdate" name="soberdate" placeholder="What is your sobriety date?" required />
          </div>
          <div>
          <button type="submit" className="btn btn-outline-info mr-3">Submit</button>
          <button type="reset" className="btn btn-outline-info mr-3">Start Over</button>
          </div>
          <Link className="small" to="/">Already have an account?</Link>
        </form>
      </div>
    )
  }
}
