import React, { Component } from 'react'
import axios from 'axios'
import ProviderProfile from './ProviderProfile';
import Collapsible from 'react-collapsible';
import Review from './Review'

class SearchedProviders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedProvider:'',
      selectedProviderReviews:[],
      selectedProviderAvgRating:''
    }
    console.log(this.getAverage(1).value)
  }
// componentDidMount(){
//   this.getReviews(this.props.id)
// }
  addReview = async (id, review) => {
  try {
    await axios.post(`http://localhost:8000/reviews/providers/${id}`, {review})
  } catch (err) {
    console.log(err)
  }
  }
  
  getReviews = async (id) => {
    try {
      const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      console.log(reviews.data)
      const ratings = reviews.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b)
      console.log(ratings)
      const average = ratings/reviews.data.length
      console.log(average)
      this.setState({
        selectedProviderReviews:reviews.data,
        selectedProviderAvgRating:average
      })
    } catch (err) {
    console.log(err)
  }
}

getAverage = async(id) =>{
  const reviews = await axios.get(`http://localhost:8000/reviews/providers/${id}`)
      const ratings = reviews.data.map(ele=> {return ele.rating}).reduce((a,b)=>a+b)
      const average = ratings/reviews.data.length
      console.log(average)
      return average
}

  // seeProfile = async (id) => {
    
  //   const profile = await axios.get(`http://localhost:8000/providers/${id}`)
  //   console.log(profile.data[0])
  //   this.setState({
  //     selectedProvider:profile.data[0],
  //     // selectedProviderReviews:reviews.data
  //   })
  //   console.log(this.state.selectedProviderReviews)
  // }
  render () {
  return (
    <div className="">
        <img className="" src={this.props.businessphoto} alt={this.props.businessphoto} /><br></br>
        <div className="">
          {/* <div className="companyname">{this.props.companyname}</div> */}
          <small className="text-muted">{this.props.address}, {this.props.phone}</small><br></br>
          <small className="text-muted">{this.props.providerbio}</small><br></br>
          <small className="text-muted">Average rating: {()=>{this.getAverage(this.props.id)}}{this.state.selectedProviderAvgRating}</small>

        </div>
        {/* <button onClick={()=>{this.addReview(this.props.id)}}>Add Review</button> */}
        {/* <button onClick={()=>{this.seeProfile(this.props.id)}}>See Reviews</button> */}
        {this.state.selectedProvider ? <ProviderProfile 
        id={this.state.selectedProvider.id}
        businessphoto={this.state.selectedProvider.businessphoto}
        companyname={this.state.selectedProvider.companyname}
        address={this.state.selectedProvider.address}
        phone={this.state.selectedProvider.phone}
        providerbio={this.state.selectedProvider.providerbio}
        avgrating={this.state.selectedProviderAvgRating}
        reviews={this.state.selectedProviderReviews}/> : null}
        <Collapsible trigger="See Reviews Collapsible" onOpening={()=>this.getReviews(this.props.id)}>
      <div className="">
      <p>reviews go here</p>
      {this.state.selectedProviderReviews ? this.state.selectedProviderReviews.map((ele)=>
        <Review 
        id={ele.id}
        key={ele.id}
        content={ele.content}
        rating={ele.rating}
        />
      ):null}
    </div>
    </Collapsible>
    </div>
  )
}
}

export default SearchedProviders


// TODOS:
// 