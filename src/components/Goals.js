import React, { Component } from 'react'
import axios from 'axios';
import { Progress } from 'reactstrap'
import { FaTimes} from 'react-icons/fa'
const url = process.env.REACT_APP_API_URL


export default class Goals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      goals: this.props.goal,
      goalId: this.props.goalId,
      percentage: '0'
    }

  }

  componentDidMount() {
    this.timeBetween(this.props.createdAt, this.props.enddate)
  }

  timeBetween = (date1, date2) => {
    let slicedStart = date1.slice(0, 10);
    let slicedEnd = date2.slice(0, 10);
    let startTime = parseInt(new Date(slicedStart).getTime());
    let endTime = parseInt(new Date(slicedEnd).getTime());
    let difference = endTime - startTime;
    let whatsTheDifferenceBetweenMeAndYou = Math.round(difference);
    let kiddingMe = whatsTheDifferenceBetweenMeAndYou / 100;
    //interval should be the variable kiddingMe, set to 10000 for exhibition purposes
    const id = setInterval(this.bumpUp, 10000)
    this.setState({
      id: id
    })
  }

  bumpUp = () => {
    if (this.state.percentage !== 100) {
      let newerVar = parseInt(this.state.percentage)
      newerVar += 1
      this.setState({
        percentage: newerVar
      })
    } else {
      clearInterval(this.state.id);
      alert("Goal Completed!");
    }
  }

  deleteGoal = async (id) => {
    try {
      await axios.delete(`${url}/goals/goals/${id}`)
      clearInterval(this.state.id);
      this.props.getGoals()
      this.setState({
        goalId: id
      })
    } catch (err) {
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        <div className="goal">
        <p><strong>Goal: </strong>{this.state.goals}</p>
        <strong>Due by:</strong> {this.props.enddate} 
        <span className="cancelGoalBtn closeButton" onClick={()=>{this.deleteGoal(this.state.goalId)}}><FaTimes /></span>
        <Progress className="goalProgressBar" animated bar color="info" value={this.state.percentage}>{this.state.percentage}%</Progress>
        </div>
        </div>
    )
  }
}
