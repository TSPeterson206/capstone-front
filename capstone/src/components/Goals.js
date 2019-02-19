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
    console.log(this.state.goalId)
    console.log(this.props.userId)
    console.log(this.props.goal.id)
  }

  deleteGoal = async(id) => {
    console.log(id)
    try {
    await axios.delete(`http://localhost:8000/goals/goals/${id}`)
    this.props.getGoals()
    this.setState({
      goalId:id
    })
    
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        {this.state.goals} Due by: {this.props.enddate} <button onClick={()=>{this.deleteGoal(this.state.goalId)}}>X</button>
      </div>
    )
  }
  }

  export default Goals