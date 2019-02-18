import React, { Component } from 'react'
import axios from 'axios';

class Goals extends Component {
  constructor(props){
    super(props)
    this.state= {
      goals:this.props.goal,
      goalId:this.props.goalId
    }
    console.log(this.props.goalId)
  }

  render(){
    return(
      <div>
        {this.state.goals} <button onClick={()=>{this.props.deleteGoal(this.state.goalId)}}>X</button>
      </div>
    )
  }
  }

  export default Goals