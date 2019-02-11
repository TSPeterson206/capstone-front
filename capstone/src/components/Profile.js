import React, { Component } from 'react'
import Tracker from './Tracker'
import Providers from './Providers'
import axios from 'axios'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: []
    }
  }

  componentDidMount() {
    this.getAccount()
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users`)
      console.log(response)
      const user = await response.data.filter(user => user.username === this.props.match.params.username)
      this.setState({ user: [...user] })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
<div>
  <p>THIS IS A USERS PROFILE</p>
<Tracker />
<Providers />
</div>
    )
  }
}