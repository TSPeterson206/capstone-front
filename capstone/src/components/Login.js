import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'reactjs-simple-spinner'
import request from '../utils/request'

export default class Login extends Component {

    constructor(props) {
      super(props)
      this.state = {
        showErrorMessage: false,
        isLoading: true
      }
    }

    componentDidMount() {
      this.setState({
        isLoading: false
      })
    }

    handleLogin = event => {
      event.preventDefault()

      const { username, password } = event.target

      request('/auth/login', 'post', {
        username: username.value,
        password: password.value
      })
        .then(response => {
          this.setState({ showErrorMessage: false })

          localStorage.setItem('token', response.data.token)
          return request('/auth/login')
        })
        .then(response => {
          this.props.setAuthentication(response.data)
          this.props.history.push({pathname:`/profile/${username.value}`, state: { username : username.value }})
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
      this.state.isLoading ?
        <div className="border rounded p-5 col-sm-6 mt-5 mr-auto ml-auto">
          <Spinner size="massive" lineSize={12} className="center" />
        </div>
      :
      <div className="col-sm-6 mt-5 mr-auto ml-auto">
        <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
          Invalid Username or Password
        </div>
        <form className="border rounded p-5" onSubmit={this.handleLogin}>
          <h2>Account Login</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="username" name="username" aria-describedby="usernameHelp" placeholder="enter username" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="password" required />
          </div>
          <button type="submit" className="btn btn-outline-info mr-3">Submit</button>
          <Link className="small" to="/signup">Create an Account</Link>
        </form>
      </div>
    )
  }
}
