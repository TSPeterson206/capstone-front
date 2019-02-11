import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import getReviews from '../actions/reviewsActions'

class Reviews extends Component {
  componentWillMount(){
    this.props.getReviews();
  }

  render() {
    console.log(this.props.reviews.reviews)
    const reviews = this.props.reviews.map(review => (
      <div key={review.id}>
      <h3>{review.content}</h3>
      </div>
    ));
    return (
      <div>
        <h1>Reviews</h1>
        {reviews}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews:state.reviews.reviews
})
// export default connect(mapStateToProps, {getReviews})(Reviews)

export default Reviews