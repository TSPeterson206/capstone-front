import React, { Component } from 'react'
import Collapsible from 'react-collapsible';


class ProviderProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews:this.props.reviews
    }
    console.log(this.state.reviews)
  }

  render() {
    return (
      <div>
      <Collapsible trigger="See Reviews">
      <div className="">
        <img className="" src={this.props.businessphoto} alt={this.props.businessphoto} />
        <div className="">
          {/* <div className="companyname">{this.props.companyname}</div> */}
          <small className="text-muted">{this.props.address}, {this.props.phone}</small>
          <small className="text-muted">{this.props.providerbio}</small>
          <small className="text-muted">{this.props.avgrating}</small>
          {/* <small className="text-muted">{this.state.reviews}</small>
          <small className="text-muted">{this.state.reviews}</small> */}

        </div>
        {/* <button onClick={()=>{this.addReview(this.props.id)}}>Add Review</button> */}        
    </div>
    </Collapsible>
    </div>
    )
  }
}
export default ProviderProfile