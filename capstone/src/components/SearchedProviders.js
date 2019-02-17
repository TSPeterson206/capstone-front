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
      selectedProviderAvgRating:'',
      loggedIn:'',
      loggedInId:''
    }
    console.log(props.open)
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
  }

  addReview = async () => {
    const review = {
      user_id:this.props.user[0].id,
      provider_id:this.props.id,
      content:this.state.addReviewText,
      rating:this.state.addReviewRating
    }
    console.log(review)
  try {
    await axios.post('http://localhost:8000/reviews', review)
    this.setState({
      selectedProviderReviews:[...this.state.selectedProviderReviews, review]
    })
  } catch (err) {
    console.log(err)
  }
  
  }
  
  deleteReview = async (id) =>{
    await axios.delete(`http://localhost:8000/reviews/${id}`)
    this.getReviews(this.props.id)
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

handleChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
  console.log(this.state.addReviewText)
  console.log(this.state.addReviewRating)

}
  render () {
  return (
    <div className="">
        <img className="" src={this.props.businessphoto} alt={this.props.businessphoto} /><br></br>
        <div className="">
          {/* <div className="companyname">{this.props.companyname}</div> */}
          <small className="text-muted">{this.props.address}, {this.props.phone}</small><br></br>
          <small className="text-muted">{this.props.providerbio}</small><br></br>
          <small className="text-muted">Average rating: {this.state.selectedProviderAvgRating}</small>

        </div>
        <Collapsible className="addReviewForm" trigger="Add a review" open='true'>
        <div>
        <form className="addReviewForm" >
        <label>How would you describe your experience this with provider?</label>
        <input type="text" name="addReviewText" onChange={this.handleChange}></input>
        <label>How would you rate your experience?</label>
        <input type="number" max="5" name="addReviewRating" onChange={this.handleChange}></input>
        <button type="button" onClick={()=>{this.addReview()}}>submit</button>
        </form>
        </div>
        </Collapsible>
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
        deleteReview={this.deleteReview}
        user={this.props.user}
        reviewUserId={ele.user_id}
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

// addBookHandler = (newTitle, newAuthor, newPages) => {
//   const newBook = {
//     title: newTitle,
//     author: newAuthor,
//     pages: newPages
//     } 
//     newBook.price = 5;
//   axios.post(`${process.env.REACT_APP_API_URL}/books`, newBook
//   )
//   .then(()=>{
//     const afterAdd = [...this.state.books, newBook]
//     this.setState({books:afterAdd,
//     addingBook:null})
//     this.getBooks()
//   })
  
//   }