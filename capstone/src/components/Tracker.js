import React, { Component } from 'react'

export default class Tracker extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <div>
<img src={this.props.profilepic} alt={this.props.profilepic}/>
<h3>{this.props.tagline}</h3>
      </div>
    )
  }
}