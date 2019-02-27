import {combineReducers} from 'redux'
import reviewsReducer from './reviewsReducer'

export default combineReducers({
  reviews:reviewsReducer
})