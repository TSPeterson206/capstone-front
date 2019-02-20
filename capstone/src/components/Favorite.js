import React, { Component } from 'react'

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
    <button onClick={()=>{this.props.deleteFavorite(this.props.userId, this.props.favoriteId)}}>X</button>
    </div>
  )
}
}

