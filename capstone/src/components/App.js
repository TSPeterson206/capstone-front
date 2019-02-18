import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import EditProfile from './EditProfile'
import Search from './Search'
import request from '../utils/request'
import StickyFooter from 'react-sticky-footer';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authentication: {
        pending: true,
        user: null,
        search:false
      }
    }
  }

  setAuthentication = claim => {
    this.setState({
      authentication: {
        pending: false,
        user: claim
      }
    })
  }

  componentDidMount() {
    request('/auth/login')
      .then(response => this.setAuthentication(response.data))
      .catch(err => {
        console.log(err);
        this.setAuthentication(null)
      })
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
            <div>
              <Header setAuthentication={this.setAuthentication} user={this.state.authentication.user}/>
              <div className="container">
                <Switch>
                  <Route path="/search" render={(props) => <Search {...props}/>} />
                  <Route path="/profile/:username" render={(props) => <Profile {...props} authentication={this.state.authentication} user={this.state.authentication.user} />}  />
                  <Route path="/edit/:username" render={(props) => <EditProfile {...props} authentication={this.state.authentication} user={this.state.authentication.user} />} />
                  <Route path="/signup" render={(props) => <Signup {...props} setAuthentication={this.setAuthentication}/>} />
                  <Route path="/" render={(props) => <Login {...props} setAuthentication={this.setAuthentication}/>} />
                </Switch>
              </div>
            </div>

        </BrowserRouter>
        <StickyFooter className="text-center mt-5">&copy; Toby, Give Your Capstone A Name for real</StickyFooter>

      </div>
    )
  }
}
