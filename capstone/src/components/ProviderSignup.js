import React, { Component } from 'react'
import axios from 'axios'

export default class ProviderSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showErrorMessage: false
    }
  }

  handleProviderSignUp = event => {
    event.preventDefault()
    const newProvider = {
      companyname:this.state.companyname,
      providerbio:this.state.providerbio,
      businessphoto:this.state.businessphoto,
      address:this.state.address,
      phone:this.state.phone,
      typeID:this.state.typeID
    }  
    console.log(newProvider)
    axios.post('http://localhost:8000/providers', newProvider)
    .then((result)=> {return result})
    this.props.history.push({pathname:'/'})

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log(this.state.companyname, this.state.providerbio, this.state.businessphoto, this.state.address, this.state.phone, this.state.typeID)
  }

  render() {
    return (
      <div className="col-sm-6 mt-5 mr-auto ml-auto">
        <div className={this.state.showErrorMessage ? "error-handler alert alert-danger" : "error-handler alert alert-danger invisible"}>
          Username not available!
        </div>
        <form className="border rounded p-5 box" onSubmit={this.handleProviderSignUp}>
        <h2>Provider Entry</h2>
        <div className="form-group">
            <label htmlFor="tagline">Company Name</label>
            <input type="text" className="form-control" onChange={this.handleChange} id="companyname" name="companyname" placeholder="What is the name of your business?" required />
          </div>
          <div className="form-group">
            <label htmlFor="tagline">Company Bio</label>
            <input type="text" className="form-control" onChange={this.handleChange} id="providerbio" name="providerbio" placeholder="What do you want to say about company and its services?" required />
          </div>
          <div className="form-group">
            <label htmlFor="profilepic">Profile Picture</label>
            <input type="text" className="form-control" onChange={this.handleChange} id="businessphoto" name="businessphoto" placeholder="Link a picture to your profile" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" onChange={this.handleChange} id="address" name="address" placeholder="Where are you located?" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" className="form-control" onChange={this.handleChange} id="phone" name="phone" placeholder="What is your phone number?" required />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select name="type" className="form-control" onChange={this.handleChange} id="typeID" name="typeID" placeholder="Please select your service genre">
              <option selected>(Please select your service genre)</option>
              <option name="sud" value="1">Substance User Disorder</option>
              <option name="mh" value="5">Mental Health</option>
              <option name="medical" value="2">Medical</option>
              <option name="legal" value="3">Legal</option>
              <option name="mh" value="4">Financial</option>
              <option name="fitness" value="6">Fitness</option>
            </select>
          </div>
          <button type="submit" className="btn btn-outline-info mr-3">Submit</button>
          <button type="reset" className="btn btn-outline-info mr-3">Start Over</button>
        </form>
      </div>
    )
  }
}