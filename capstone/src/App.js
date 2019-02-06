import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Reviews from './components/Reviews'

import store from './store'

class App extends Component {

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
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Reviews} />
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

