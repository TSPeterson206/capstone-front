import {CREATE_REVIEW, GET_REVIEWS} from '../actions/types'

const initialState = {
  reviews:[],
  review:{}
}

export default function(state=initialState, action) {
  switch(action.type) {
    case GET_REVIEWS:
    return {
      ...state,
      reviews:action.payload
    }
    default:
    return state;
  }
}