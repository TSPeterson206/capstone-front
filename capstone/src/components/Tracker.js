import React, { Component } from 'react'
import axios from 'axios';
import Goals from './Goals'
import Collapsible from 'react-collapsible';

export default class Tracker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id:this.props.id,
      goals:[]
    }
    console.log(this.props.favorites)
  }
componentDidMount(){
  this.getGoals();
}
  getGoals = async()=> {
    try{
     const id=this.props.id
    const goals = await axios.get(`http://localhost:8000/goals/${id}`)
    console.log(goals.data)
    this.setState({ goals: goals.data })

    } catch (err) {
      console.log(err)
    }
  }

  addGoal = async()=>{
    console.log("hittingaddgoal")
    const goal = {
      user_id:this.props.id,
      goal:this.state.goaldescription,
      enddate:this.state.enddate
    }
    console.log(goal)
    try {
    await axios.post('http://localhost:8000/goals', goal)
    this.setState({
      goals:[...this.state.goals, goal]
    })
console.log(this.state.goals)    
    } catch (err) {
      console.log(err)
      }
  }

  deleteGoal = async(id) => {
    try {
    await axios.delete(`http://localhost:8000/goals/goals/${id}`)
    this.getGoals();
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
    console.log(this.state.enddate)
    console.log(this.state.goaldescription)

  }
  render () {
    return (
      <div className="container tracker">
      <div className="row">
      <div className="col-3">
<img className="profilePic" src={this.props.profilepic} alt={this.props.profilepic}/>
<h3>{this.props.tagline}</h3>
</div>

{/* GOALS */}
<div className="col-4">
<p>Goals</p>
{this.state.goals.map(ele=>
<div className="goal">
<Goals 
userId={this.props.id}
goalId={ele.id}
goal={ele.goal}
enddate={ele.enddate}
deleteGoal={this.deleteGoal}
getGoals={this.getGoals}
/>
</div>
)}
<Collapsible trigger="Add a goal">
<form className="addGoalForm" >
<label>What is your goal?</label>
<input type="text" name="goaldescription" placeholder="type here..." onChange={this.handleChange}></input>
<label>What is your completion date?</label>
<input type="date" name="enddate" onChange={this.handleChange}></input>
<button type="button" onClick={()=>{this.addGoal()}}>Add</button>
</form>
</Collapsible>
</div>
<div className="col-2">
<p>Favorites</p>
{/* // {this.props.favorites[0]} */}
</div>
      </div>
      </div>
    )
  }
}