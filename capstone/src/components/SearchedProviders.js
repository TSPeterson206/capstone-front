import React, { Component } from 'react'
import axios from 'axios'
import ProviderProfile from './ProviderProfile';

class SearchedProviders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedProvider:'',
      selectedProviderReviews:[]
    }
  }
  addReview = async (id, review) => {
  try {
    await axios.post(`http://localhost:8000/reviews/providers/${id}`, {review})
  } catch (err) {
    console.log(err)
  }
  }
  
  seeProfile = async (id) => {
    const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
    console.log(reviews.data)
    const profile = await axios.get(`http://localhost:8000/providers/${id}`)
    console.log(profile.data[0])
    this.setState({
      selectedProvider:profile.data,
      selectedProviderReviews:[reviews.data]
    })
    console.log(this.state.selectedProviderReviews)
  }
  render () {
  return (
    <div className="">
        <img className="" src={this.props.businessphoto} alt={this.props.businessphoto} />
        <div className="">
          <div className="companyname">{this.props.companyname}</div>
          <small className="text-muted">{this.props.address}, {this.props.phone}</small>
          <small className="text-muted">{this.props.providerbio}</small>
          <small className="text-muted">{this.props.avgrating}</small>

        </div>
        {/* <button onClick={()=>{this.addReview(this.props.id)}}>Add Review</button> */}
        <button onClick={()=>{this.seeProfile(this.props.id)}}>View Profile</button>
        {this.state.selectedProvider ? <ProviderProfile 
        id={this.state.selectedProvider.id}
        businessphoto={this.state.selectedProvider.businessphoto}
        companyname={this.state.selectedProvider.companyname}
        address={this.state.selectedProvider.address}
        phone={this.state.selectedProvider.phone}
        providerbio={this.state.selectedProvider.providerbio}
        avgrating={this.state.selectedProvider.avgrating}
        reviews={this.state.selectedProviderReviews.map(ele=>{return ele})}/> : null}
    </div>
  )
}
}

export default SearchedProviders


// TODOS:
// 1.figure out current error in reviews not loading on provider profile Component
// 2. figure out 8-4 column in profile Component
// 3. try to use redux to pass info to provider profile component