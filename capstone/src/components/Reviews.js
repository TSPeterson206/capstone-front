import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import getReviews from '../actions/reviewsActions'
class Reviews extends Component {
  componentDidMount(){
    this.props.getReviews();
  }

  render() {
    console.log(this.props.reviews.review)
    const reviews = this.props.reviews.review.map(review => (
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

Reviews.propTypes = {
getReviews:propTypes.func.isRequired,
reviews:propTypes.array.isRequired
}

const mapStateToProps = state => ({
  reviews:state.reviews
})
export default connect(mapStateToProps, {getReviews})(Reviews)