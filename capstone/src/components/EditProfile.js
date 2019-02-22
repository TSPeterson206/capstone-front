import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
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
    // if (!this.state.profilepic) {
    //   this.setState({
    //     profilepic: 'http://res.cloudinary.com/squeaker/image/upload/v1547767064/sbzqwitvw02zyjwzgrld.jpg'
    //   })
    // }

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

  // onDrop = (acceptedFiles, rejectedFiles) => {
  //   acceptedFiles.forEach(file => {
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       request(`/accounts/${this.props.user.id}/avatar`, 'post', {
  //         image: reader.result
  //       })
  //         .then(result => {
  //           this.setState({ profilepic: result.data.image })
  //         })
  //         .catch(error => console.log(error))
  //     }
  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')

  //     reader.readAsDataURL(file)
  //   })
  // }
 
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
          <br />
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
          {/* <Dropzone onDrop={this.onDrop} id='profilepic' name='profilepic'>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  className={('dropzone', { 'dropzone--isActive': isDragActive })}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p> Upload a profile image by dropping file here...</p> :
                      <p className="content">Upload a profile image by dropping file here,
                      or click to select file. (Max. size 15MB)</p>
                  }
                </div>
              )
            }}
          </Dropzone> */}
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


 // onDrop = (acceptedFiles, rejectedFiles) => {
  //   acceptedFiles.forEach(file => {
  //     const reader = new FileReader()
  //     reader.onload = () => {
  //       request(`/accounts/${this.props.user.id}/avatar`, 'post', {
  //         image: reader.result
  //       })
  //         .then(result => {
  //           this.setState({ profilepic: result.data.image })
  //         })
  //         .catch(error => console.log(error))
  //     }
  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')

  //     reader.readAsDataURL(file)
  //   })
  // }