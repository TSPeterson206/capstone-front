import React, {
  Component
} from 'react'
import axios from 'axios'

class Review extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedInUser: this.props.user[0].id
    }

  }

  componentDidMount() {
    this.getReviewerName(this.props.reviewUserId)
  }

  getReviewerName = async (id) => {
    const reviewer = await axios.get('http://localhost:8000/users')
    const filtered = reviewer.data.filter(ele => {
      return ele.id === id
    })
    this.setState({
      reviewer: filtered[0].username
    })
  }

  render(){
    return(
      <div className="reviewBody">
      <div className="row">
      <div className="col-6">
        <span>{this.props.content}</span>
        </div>
        <div className="col-2">
        <span>Rating: {this.props.rating} out of 5</span>
        </div>
        <div className="col-3 reviewedByColumn">
        <span>Reviewed by: {this.state.reviewer}</span>
        {this.state.loggedInUser === this.props.reviewUserId ? <button onClick={()=>{this.props.deleteReview(this.props.id)}}>X</button>:null}
        </div>
      
      </div>
      </div>
    )
  }
  }
  export default Review