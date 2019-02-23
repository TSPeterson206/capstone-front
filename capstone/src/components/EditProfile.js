import React, { Component } from 'react'
import request from '../utils/request'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: this.props.username,
      showErrorMessage: false,
      profilepic: ''
    }

  }

  handleEdit = event => {
    event.preventDefault()
    const { username, tagline, profilepic, soberdate } = event.target
    console.log(this.props.user)

    request(`/users/${this.props.user.id}`, 'put', {
      username:username.value,
      profilepic: profilepic.value,
      tagline:tagline.value,
      soberdate:soberdate.value
    })
      .then(response => {
        this.props.history.push({
          pathname: `/profile/${this.props.user.username}`,
          state: { username: this.props.user.username }
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({ showErrorMessage: true })
      })
    }
 
  render() {
    return (
      <div className="border rounded p-5 col-sm-8 mt-5 mr-auto ml-auto">
        {
          this.state.showErrorMessage &&
          <div className="alert alert-danger">
            Incorrect format
          </div>
        }
        <h2>Edit Your Profile</h2>
        <form onSubmit={this.handleEdit}>
          <br/>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control" id="username" name="username"
              placeholder="What do you want your username to be?" />
          </div>
          <div className="form-group">
            <label htmlFor="tagline">Bio</label>
            <input
              type="text" rows="2"
              className="form-control" id="tagline" name="tagline"
              placeholder="What do you want your bio to say?" >
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="profilepic">Profile Picture</label>
            <input
              type="text" rows="2"
              className="form-control" id="profilepic" name="profilepic"
              placeholder="What do you want your profile picture to be?" >
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Sobriety Date</label>
            <input
              type="date" rows="2"
              className="form-control" id="soberdate" name="soberdate"
              placeholder="What is your sobriety date?" >
            </input>
          </div>
            <button type="submit" className="btn btn-outline-info mr-2">Submit</button>
            <button type="reset" className="btn btn-outline-info mr-2">Start Over</button>
        </form>
      </div >
    )
  }
}