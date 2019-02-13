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
  
  seeReviews = async (id) => {
    const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
    console.log(reviews.data)
    // const filtered = reviews.
  }
  render () {
  return (
    <div className="media p-3">
      {/* <a href={`/profile/${}`}> */}
        <img className="img-thumbnail align-self-start mr-2 mb-1" src={this.props.businessphoto} alt={this.props.businessphoto} />
        <div className="media-body">
          <div className="companyname">{this.props.companyname}</div>
          <small className="text-muted">{this.props.address}, {this.props.phone}</small>
          <small className="text-muted">{this.props.providerbio}</small>
        </div>
        <button onClick={()=>{this.addReview()}}>Add Review</button>
        <button onClick={()=>{this.seeReviews(this.props.id)}}>See Reviews</button>
    
    </div>
  )
}
}

export default SearchedProviders