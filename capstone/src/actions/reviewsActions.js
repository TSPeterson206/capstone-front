import {
  CREATE_REVIEW,
  GET_REVIEWS
} from './types'

export default function getReviews() {
  return function (dispatch) {
    fetch('http://localhost:8000/reviews')
      .then(res => res.json())
      .then(reviews => dispatch({
        type: GET_REVIEWS,
        payload: reviews
      }));
  }
}