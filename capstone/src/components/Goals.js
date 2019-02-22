import React, { Component } from 'react'
import axios from 'axios';
import { Progress } from 'reactstrap'
import Moment from 'react-moment';


class Goals extends Component {
  constructor(props){
    super(props)
    this.state= {
      goals:this.props.goal,
      goalId:this.props.goalId,
      percentage:'0'
    }
  }

  componentDidMount(){
    this.timeBetween(this.props.createdAt, this.props.enddate)
  }

    timeBetween = (date1,date2) => {
      // let today = moment(new Date());
      // let today = new Date(),
      //       date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      console.log(date1)
      let slicedStart = date1.slice(0,10);
      let slicedEnd = date2.slice(0,10);
      console.log(slicedStart)
      console.log(slicedEnd)
      let startTime = parseInt(new Date(slicedStart).getTime());
      console.log(startTime, typeof startTime)
      let endTime = parseInt(new Date(slicedEnd).getTime());
      console.log(endTime, typeof startTime)

      let difference = endTime - startTime;
      console.log(difference)
      let whatsTheDifferenceBetweenMeAndYou = Math.round(difference); 
      let kiddingMe = whatsTheDifferenceBetweenMeAndYou/100;
      console.log(kiddingMe)
      //interval should be the var kiddingMe, set to 1000 for exhibition purposes
      const id = setInterval(this.bumpUp, 1000)
      this.setState({id:id})
      }

    bumpUp = () => {
        if (this.state.percentage !== 100) {
            console.log(typeof this.state.percentage)
            let newerVar = parseInt(this.state.percentage)
            newerVar+=1
            this.setState({
              percentage:newerVar
            })
        }
        else {
            clearInterval(this.state.id);
            alert ("Goal Completed!"); 
        }
    }
  

  deleteGoal = async(id) => {
    try {
    await axios.delete(`http://localhost:8000/goals/goals/${id}`)
    clearInterval(this.state.id);
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
        {this.state.goals} 
        Due by: {this.props.enddate} 
        <button onClick={()=>{this.deleteGoal(this.state.goalId)}}>X</button>
        <Progress className="goalProgressBar" multi>
        <Progress bar color="success" value={this.state.percentage}>{this.state.percentage}%</Progress>
        {/* <Progress animated bar color="danger" value="100" /> */}
      </Progress>
        </div>
    )
  }
  }
  export default Goals