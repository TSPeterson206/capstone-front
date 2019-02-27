import React, { Component } from 'react'
import Tracker from './Tracker'

export default class UserTracker extends Component{
  constructor(props){
    super(props)

    this.state = {
      favoriteProviders:[],
      user:this.props.user,
      soberDays:this.props.soberDays
    }
    
  }

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
          addFavorite={this.props.addFavorite}
          soberDays={this.props.soberDays}
          soberDate={this.props.soberDate}
          />
        )}
      </div>
    )
  }
}