import React, { Component } from 'react'
import axios from 'axios'

class SearchedProviders extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  addReview (id) {
  
  }
  
  seeProfile = async (id) => {
    const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
    console.log(reviews.data)
    const profile = await axios.get(`http://localhost:8000/providers/${id}`)
    console.log(profile.data[0].id)
  }
  render () {
  return (
    <div className="">
        <img className="" src={this.props.businessphoto} alt={this.props.businessphoto} />
        <div className="">
          <div className="companyname">{this.props.companyname}</div>
          <small className="text-muted">{this.props.address}, {this.props.phone}</small>
          <small className="text-muted">{this.props.providerbio}</small>
        </div>
        <button onClick={()=>{this.addReview()}}>Add Review</button>
        <button onClick={()=>{this.seeProfile(this.props.id)}}>View Profile</button>
    
    </div>
  )
}
}

export default SearchedProviders