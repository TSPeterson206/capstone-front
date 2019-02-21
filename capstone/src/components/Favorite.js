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
      <div>
      {/* {this.props.companyname} */}
      </div>
      <div>
      <img src={this.props.businessphoto} className="favoritesImg"></img><small>{this.props.companyname}</small>
      </div>
    <button onClick={()=>{this.props.deleteFavorite(this.props.userId, this.props.favoriteId)}}>X</button>
    </div>
  )
}
}

