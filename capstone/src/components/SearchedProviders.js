import React, { Component } from 'react'
import axios from 'axios'
import Collapsible from 'react-collapsible';
import Review from './Review'

export default class SearchedProviders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedProvider:'',
      selectedProviderReviews:[],
      selectedProviderAvgRating:'',
      selectedProviderFavorites:[],
      loggedIn:'',
      loggedInId:'',
      addReviewFormOpenClose:false
    }
    console.log(this.state.loggedInId)
    console.log(this.state.loggedIn)
    console.log(this.state.addReviewFormOpenClose)
    console.log(this.props.average)
    console.log(this.props.user)
  }

  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users')
      const user = await response.data.find(user => user.username === this.props.username)

      this.setState({
        id: user.id,
        loggedin: this.props.user.username,
        loggedinId: this.props.user.id
      })
      return user
    } catch(err) {
      console.log(err)
    }
    console.log(this.state.id)
  }

  getReviews = async (id) => {
    try {
      const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      console.log(reviews.data)
      this.setState({
        selectedProviderReviews:reviews.data
        // selectedProviderAvgRating:average
      })
    } catch (err) {
    console.log(err)
  }
}

  addReview = async () => {
    const review = {
      user_id:this.props.user[0].id,
      provider_id:this.props.id,
      content:this.state.addReviewText,
      rating:this.state.addReviewRating
    }
  try {
    await axios.post('http://localhost:8000/reviews', review)
    this.setState({
      selectedProviderReviews:[...this.state.selectedProviderReviews, review],
      addReviewFormOpenClose:false
    })
  } catch (err) {
    console.log(err)
  }
  console.log(this.state.addReviewFormOpenClose)

  }
  
  deleteReview = async (id) =>{
    await axios.delete(`http://localhost:8000/reviews/${id}`)
    this.getReviews(this.props.id)
  }

  getAverage = async(id) =>{
  const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      const ratings = reviews.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b)
      const average = ratings/reviews.data.length
      console.log(average)
      return average
}

  addFavorite = async(id) => {
    const favorite = {
      user_id:this.props.user[0].id,
      provider_id:this.props.id
    }
    console.log('hittingaddfavorite',favorite)
  try {
    await axios.post(`http://localhost:8000/favorites`, favorite)
    this.setState({
      selectedProviderFavorites:[...this.state.selectedProviderFavorites, favorite]
    })
  } catch (err) {
    console.log(err)
  }
  
  }

  handleOpenClose = () => {
    this.setState({
      addReviewFormOpenClose:true
    })
  }
  handleChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
  console.log(this.state.addReviewText)
  console.log(this.state.addReviewRating)
}

deleteProvider = (id) => {
console.log('hittingdeleteprovider')
axios.delete(`http://localhost:8000/providers/${id}`)
.then(result=>{return result})
}
  render () {
  return (
    <div>
      <div className="row providerRow">
        <div className="col-2">
          <div className="companyname">{this.props.companyname}</div>
            <small className="text-muted">Average rating: {this.props.average}</small>
        </div>
        <div className="col-2">
          <img className="searchedProvidersImg" src={this.props.businessphoto} alt={this.props.businessphoto} /><br></br>
        </div>
        <div className="col-2">
          <small className="text-muted">{this.props.address}, {this.props.phone}</small><br></br>
        </div>
        <div className="col-4">
          <small className="text-muted">{this.props.providerbio}</small><br></br>
        </div>
        <div className="col-2">
        {/* {this.props.user[0].id === 1 ? <button onClick={()=>{this.deleteProvider(this.props.id)}}>DELETE</button>: null} */}
        {/* <button>Contact</button> */}
        </div>
      </div>
        {/* Add review form */}
      <div className="row reviewFormRow">
        <div className="col-12">
          <Collapsible className="addReviewForm" trigger="Add a review" onOpen={this.handleOpenClose}>
            <div>
              <form className="addReviewForm">
                <label>How would you describe your experience this with provider?</label>
                <input type="text" name="addReviewText" onChange={this.handleChange}></input><br></br>
                <label>How would you rate your experience?</label>
                <input type="number" max="5" name="addReviewRating" onChange={this.handleChange}></input><br></br>
                <button type="button" onClick={()=>{this.addReview()}}>submit</button>
              </form>
            </div>
          </Collapsible>
        </div>
      </div>
        <div className="row reviewsRow">
          <div className="col-12">
            <Collapsible trigger="See Reviews Collapsible" onOpening={()=>this.getReviews(this.props.id)}>
          <div className="">
            <p>reviews go here</p>
              {this.state.selectedProviderReviews ? this.state.selectedProviderReviews.map((ele)=>
                <Review 
                id={ele.id}
                key={ele.id}
                content={ele.content}
                rating={ele.rating}
                deleteReview={this.deleteReview}
                user={this.props.user}
                reviewUserId={ele.user_id}
                />
              ):null}
          </div>
            </Collapsible>
          </div>
        </div>
      </div>
        )
      }
    }