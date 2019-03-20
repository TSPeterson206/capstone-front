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
    const { tagline, profilepic, soberdate } = event.target

    request(`/users/${this.props.user.id}`, 'put', {
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
      <div className="rounded p-5 col-sm-8 mt-5 mr-auto ml-auto">
        {
          this.state.showErrorMessage &&
          <div className="alert alert-danger">
            Incorrect format
          </div>
        }
        <form className="box" onSubmit={this.handleEdit}>
        <h1 className="editProfileHeader">Edit Your Profile</h1>
          <br/>
          <div className="form-group">
            <input
              type="text" rows="2"
              className="form-control" id="tagline" name="tagline"
              placeholder="What is your tagline?" >
            </input>
          </div>
          <div className="form-group">
            <input
              type="text" rows="2"
              className="form-control" id="profilepic" name="profilepic"
              placeholder="Link a profile picture" >
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Sobriety Date</label>
            <input
              type="date" rows="2"
              className="form-control" id="soberdate" name="soberdate"
              placeholder="Sobriety date?" >
            </input>
          </div>
            <button type="submit" className="btn btn-outline-info mr-2">Submit</button>
            <button type="reset" className="btn btn-outline-info mr-2">Start Over</button>
        </form>
      </div >
    )
  }
}