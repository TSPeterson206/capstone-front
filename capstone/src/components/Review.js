import React, { Component } from 'react'
import axios from 'axios';

class Review extends Component{
  constructor(props) {
    super(props)
   
    this.state = {
      loggedInUser:this.props.user[0].id
    }
  }

render(){
  return(
    <div>
      {this.props.content}
      {this.props.rating}
      {this.state.loggedInUser === this.props.reviewUserId ? <button onClick={()=>{this.props.deleteReview(this.props.id)}}>X</button>:null}
    </div>
  )
}
}
export default Review