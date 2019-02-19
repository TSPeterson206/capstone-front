import React, { Component } from 'react'
import axios from 'axios'

export default class Favorite extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

render(){
  return(
    <div>
      {this.props.companyname}
      {/* {this.props.businessphoto} */}
    <button onClick={()=>{this.props.deleteFavorite(this.props.id)}}>X</button>
    </div>
  )
}
}

