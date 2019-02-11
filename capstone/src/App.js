import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './components/Header'
import Login from './components/Login'
// import Signup from './components/Signup'
import Profile from './components/Profile'
import request from './utils/request'

import store from './store'

class App extends Component {
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
      <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/profile/:username" component={Profile} />
                {/* <Route exact path="/signup" component={Signup} /> */}
                <Route exact path="/" component={Login} />
              </Switch>
            </div>
            <footer className="text-center mt-5">&copy; 2019. This is Toby's Capstone</footer>
          </div>
        </BrowserRouter>
      </div>
      </Provider>
    )
  }
}

export default App

