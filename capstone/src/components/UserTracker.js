import React, { Component } from 'react'
import Tracker from './Tracker'
import axios from 'axios'

export default class UserTracker extends Component{
  constructor(props){
    super(props)

    this.state ={
      favoriteProviders:[],
      user:this.props.user
    }
    console.log(this.props.favorites)
    console.log(this.props.user)
    console.log(this.state.user)

  }
componentDidMount(){
  console.log(this.props.user)

  this.getFavorites(this.props.user)
}
  getFavorites = async(userId) => {
    try {
      const favorites = await axios.get(`http://localhost:8000/favorites/${userId}`)
      console.log(favorites)
      this.setState({
        favoriteProviders:favorites.data
      })
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.favoriteProviders)
  }

  // deleteFavorite = (userId, favoriteId) => {
  //   console.log('hittingdeletefavorite', userId, favoriteId)
  //   axios.delete(`http://localhost:8000/favorites/${userId}/${favoriteId}`)
  //   .then(()=>this.getFavorites(userId))
  // }

  render(){
    return (
      <div>
      {this.props.user.map(user =>
        <Tracker 
        key={user.id}
        id={user.id}
        tagline={user.tagline}
        profilepic={user.profilepic}
        favorites={this.props.favorites}
        user={this.props.user}
        deleteFavorite={this.props.deleteFavorite}
        getFavorites={this.props.getFavorites}
        />
      )}
      </div>
    )
  }
}